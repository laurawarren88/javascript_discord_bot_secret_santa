export const testBotConnection = async (client, channelId) => {
    try {
        const channel = await client.channels.fetch(channelId);
        if (!channel || channel.type !== 0) {
            console.error('❌ Invalid channel or channel type.');
            return;
        }

        await channel.send('✅ Test successful! The bot is connected and can send messages here.');
        console.log(`✅ Bot is connected and has access to the channel: ${channel.name}`);
    } catch (error) {
        console.error('❌ Failed to connect to the channel or send a message:', error);
    }
};