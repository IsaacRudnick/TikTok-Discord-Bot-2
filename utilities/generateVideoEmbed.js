import { EmbedBuilder } from "discord.js";
import uniqueColorHex from "../utilities/uniqueColorHex.js";

/**
 *
 * @param {Object} videoData the ttnw video data
 * @param {string} linkToURL the link to the video
 * @param {string} requestedBy username of the user who requested the video
 * @returns {Promise<EmbedBuilder>} the embed for the video
 */
async function generateVideoEmbed(videoData, linkToURL, requestedBy) {
	// Get a random color
	const hex = await uniqueColorHex();

	// Get post details
	const postDescriptionFull = videoData.result.details.desc;
	// Description is split into title and hashtag(s)
	const postDescriptionTitle = postDescriptionFull.split("#")[0];
	let postDescriptionHashtags = "";
	if (postDescriptionFull.includes("#")) {
		postDescriptionHashtags = postDescriptionFull.substring(
			postDescriptionFull.indexOf("#")
		);
	}

	let embed = new EmbedBuilder();

	// Embed title
	// if there is a title, use it, otherwise "Untitled"
	if (postDescriptionTitle) {
		embed.setTitle(postDescriptionTitle);
	} else {
		embed.setTitle("Untitled");
	}

	// Embed description (hashtags)
	if (postDescriptionHashtags) {
		embed.setDescription(postDescriptionHashtags);
	}

	// Embed color
	embed.setColor(hex);
	// Embed URL
	embed.setURL(linkToURL);
	// Embed footer
	embed.setFooter({ text: `Requested by ${requestedBy}` });
	// Embed timestamp
	embed.setTimestamp();

	// Add some metrics info to the embed
	const metricFields = [
		{
			name: "Views 👀",
			// value must be string, so convert to string and add commas
			value: videoData.result.details.total_views
				.toString()
				.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
			inline: true,
		},
		{
			name: "Likes ❤️",
			value: videoData.result.details.total_likes
				.toString()
				.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
			inline: true,
		},
		{
			name: "Comments 💬",
			value: videoData.result.details.total_comment
				.toString()
				.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
			inline: true,
		},
		// {
		// 	name: "Shares 📤",
		// 	value: videoData.result.details.total_share
		// 		.toString()
		// 		.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
		// 	inline: true,
		// },
	];

	// Embed fields
	embed.addFields(metricFields);

	return embed;
}

export default generateVideoEmbed;
