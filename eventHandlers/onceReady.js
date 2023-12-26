import { ActivityType, Client } from "discord.js";
import fs from "fs";
import { version } from "../options.js";

/**
 * Handles the ready event from the discord.js client
 * Current functionality:
 * - Sets bot status
 * - Deletes downloads folder (to prevent clutter if bot was restarted)
 * - Logs bot tag to console
 *
 * @param {Client} client
 */
async function onceReady(client) {
	// Delete downloads folder
	if (fs.existsSync("./downloads")) {
		fs.rmSync("./downloads", { recursive: true });
		console.log("Folder deleted successfully!");
	}
	client.user.setPresence({
		activities: [
			{
				name: `you | v${version}`,
				type: ActivityType.Watching,
			},
		],
		status: "online",
	});
	console.log(`Bot is ready as: ${client.user.tag}`);
}

export default onceReady;
