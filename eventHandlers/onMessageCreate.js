import { Message, ThreadAutoArchiveDuration, EmbedBuilder } from "discord.js";
import fixURL from "../utilities/fixURL.js";
import TikTokNoWatermark from "tiktok-no-watermark-api";
import generateSlideshowEmbed from "../utilities/generateSlideshowEmbed.js";
import generateVideoEmbed from "../utilities/generateVideoEmbed.js";
import downloadFile from "../utilities/downloadFile.js";
import { botPrefix, errorEmoji, workingEmoji } from "../options.js";

/**
 * Handles the messageCreate event
 * This function is small because it calls other functions to perform the main tasks
 *
 * @param {Message} message
 */
async function onMessageCreate(message) {
	// Skip if message author is a bot
	if (message.author.bot) return;

	// If message content is "ping", reply with "pong"
	if (message.content === "ping") {
		message.reply("pong");
	}

	// Allows user to re-scrape messages in a channel
	if (message.content.startsWith(`${botPrefix}rs`)) {
		let count = 25; // Default to 25
		if (message.content.split(" ").length > 1) {
			// Add 1 to account for the rescan command itself
			count = parseInt(message.content.split(" ")[1]) + 1;
		}

		if (count > 100) {
			count = 100;
		}

		const messages = await message.channel.messages.fetch({ limit: count });

		// NOTE: `msg` is the iterated messsage, while `message` is the original message (the rescan command)
		for (const msg of messages.values()) {
			if (msg.content.includes("tiktok")) {
				await handleLink(msg);
			}
		}
		await message.delete();
	}
	if (message.content.includes("tiktok")) {
		await handleLink(message);
	}
}

/**
 * Handles a tiktok link by calling either handleSlideshow or handleVideo
 * @param {Message} message
 */
async function handleLink(message) {
	// If message content is a link with "tiktok" in it
	await message.react(workingEmoji);
	try {
		// Remove referrer trackers and other url parameters
		const url = await fixURL(message.content);
		// Remove trailing slash (if any)
		const localID = url.split("/").pop();

		console.log(`URL: ${url}`);
		console.log(`ID: ${localID}`);

		// "TikTok No Watermark" is shortened to "ttnw"
		const ttnwResponse = await TikTokNoWatermark(url, true).catch((err) =>
			console.log(err)
		);

		const postType = ttnwResponse.result.type;
		console.log(`Post type: ${postType}`);

		if (postType === "slideshow") {
			await handleSlideshow(message, ttnwResponse, localID);
		} else if (postType === "video") {
			await handleVideo(message, ttnwResponse, localID);
		}
		// Finally, delete the original message if no errors were thrown
		await message.delete();
	} catch {
		// If there was an error, react with error emoji and remove working emoji
		await message.react(errorEmoji);
		await message.reactions.cache.get(workingEmoji).remove();
	}
}

/**
 * Handles video posts by sending the video and an embed to the channel
 * @param {Message} message
 * @param {Object} ttnwResponse
 * @param {string} localID
 */
async function handleVideo(message, ttnwResponse, localID) {
	const embed = await generateVideoEmbed(
		ttnwResponse,
		message.content,
		message.author.tag
	);

	const videoURL = ttnwResponse.result.details.video_url;

	// Download video to downloads/localID
	const downloadLocation = "./downloads/";
	const fileName = `${localID}.mp4`;
	await downloadFile(videoURL, downloadLocation, fileName);

	await message.channel.send({
		embeds: [embed],
		files: [{ attachment: downloadLocation + fileName, name: fileName }],
	});
}

/**
 * Handles slideshow posts by sending the audio and images to a thread
 * @param {Message} message
 * @param {Object} ttnwResponse
 * @param {string} localID
 */
async function handleSlideshow(message, ttnwResponse, localID) {
	const embed = await generateSlideshowEmbed(
		ttnwResponse,
		message.content,
		message.author.tag
	);

	const threadMessageMain = await message.channel.send({ embeds: [embed] });

	const slideshowThread = await threadMessageMain.startThread({
		name: localID,
		autoArchiveDuration: ThreadAutoArchiveDuration.ONE_DAY,
	});

	const audioURL = ttnwResponse.result.details.audio_url;

	const downloadLocation = "./downloads/";
	const fileName = `${localID}.mp3`;
	await downloadFile(audioURL, downloadLocation, fileName);

	// Change format and codec of audio file to be embeddable in Discord
	// Conversion command

	if (audioURL) {
		await slideshowThread.send({
			files: [downloadLocation + fileName],
		});
	}

	for (const image of ttnwResponse.result.details.images) {
		await slideshowThread.send({ files: [image] });
		// Sleep for 0.5 seconds to avoid rate limiting
		await new Promise((r) => setTimeout(r, 500)); // 500 milliseconds = 0.5
	}
}

export default onMessageCreate;
