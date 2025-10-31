import { getDeadline } from '../commands/deadline.js';
import { testBotConnection } from '../utils/test.js';

export default (client) => {
    console.log(`🎅 Bot is ready! Logged in as ${client.user.tag}`);
    console.log(`🏠 Connected to ${client.guilds.cache.size} server(s)`);
    
    // Test bot connection
    if (process.env.CHANNEL_ID) {
        console.log('🧪 Testing bot connection...');
        testBotConnection(client, process.env.CHANNEL_ID);
    } else {
        console.warn('⚠️ No CHANNEL_ID set in environment variables');
    }

    // Set up reminder interval
    setInterval(async () => {
        try {
            const deadline = getDeadline();
            if (deadline) {
                const now = new Date();
                const timeLeft = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
                if (timeLeft > 0 && timeLeft <= 7) {
                    const channel = await client.channels.fetch(process.env.CHANNEL_ID);
                    await channel.send(`🎄 Reminder: Secret Santa deadline is in ${timeLeft} days! 🎁`);
                }
            }
        } catch (error) {
            console.error('Error in reminder interval:', error);
        }
    }, 24 * 60 * 60 * 1000); // Every 24 hours
};