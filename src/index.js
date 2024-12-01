// Main entry point of the bot
import dotenv from 'dotenv';
import { Client, IntentsBitField } from 'discord.js';
import { registerEvents } from './events/registerEvents.js';

dotenv.config();

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildMessageReactions,
    ],
});

registerEvents(client);

client.login(process.env.DISCORD_TOKEN);