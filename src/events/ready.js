import { getDeadline } from '../commands/deadline.js';
import { testBotConnection } from '../utils/test.js';

export default (client) => {
    client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}`);

        testBotConnection(client, process.env.CHANNEL_ID);

        setInterval(async () => {
            const deadline = getDeadline();
            if (deadline) {
                const now = new Date();
                const timeLeft = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
                if (timeLeft > 0 && timeLeft <= 7) {
                    const channel = await client.channels.fetch(process.env.CHANNEL_ID);
                    await channel.send(`🎄 Reminder: Secret Santa deadline is in ${timeLeft} days! 🎁`);
                }
            }
        }, 24 * 60 * 60 * 1000); // Every 24 hours
    });
};