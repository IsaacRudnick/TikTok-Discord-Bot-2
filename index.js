import { config } from "dotenv";
config();

import { Client, Events, GatewayIntentBits } from "discord.js";
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.MessageContent,
	],
});

import onceReady from "./eventHandlers/onceReady.js";
import onMessageCreate from "./eventHandlers/onMessageCreate.js";

client.once(Events.ClientReady, () => onceReady(client));
client.on(Events.MessageCreate, onMessageCreate);

client.login(process.env.TOKEN);
