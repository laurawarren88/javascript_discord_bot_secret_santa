// Main entry point of the bot
import dotenv from 'dotenv';
import { Client, GatewayIntentBits } from 'discord.js';
import { registerEvents } from './events/registerEvents.js';

console.log('🤖 Starting Discord Secret Santa Bot...');

dotenv.config();

console.log('📁 Environment loaded');
console.log('🔑 Token exists:', !!process.env.DISCORD_TOKEN);
console.log('📺 Channel ID:', process.env.CHANNEL_ID);

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
    ],
});

console.log('🎯 Client created, registering events...');
registerEvents(client);

console.log('🔐 Attempting to login...');
client.login(process.env.DISCORD_TOKEN)
    .then(() => {
        console.log('✅ Login successful!');
    })
    .catch((error) => {
        console.error('❌ Login failed:', error);
        process.exit(1);
    });