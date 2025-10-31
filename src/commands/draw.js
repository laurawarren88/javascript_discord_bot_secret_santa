// Command for the admin to draw Secret Santa pairs
import { shuffleAndPair, validatePairs } from '../utils/pairing.js';

export default async (message, participants) => {
    if (!message.member.permissions.has('Administrator')) {
        return message.reply('You need admin permissions to run this command.');
    }

    if (participants.size < 2) {
        return message.channel.send('❌ Not enough participants to draw pairs. Need at least 2 participants!');
    }

    try {
        const pairs = shuffleAndPair([...participants]);
        
        // Validate pairs before sending
        if (!validatePairs(pairs)) {
            throw new Error('Pair validation failed');
        }

        let successCount = 0;
        let failedUsers = [];

        // Send DMs with better error handling
        for (const { santa, recipient } of pairs) {
            try {
                const santaUser = await message.client.users.fetch(santa);
                const recipientUser = await message.client.users.fetch(recipient);
                
                await santaUser.send(
                    `🎅 **Ho ho ho! Secret Santa Assignment** 🎄\n\n` +
                    `You are the Secret Santa for: **${recipientUser.username}**\n\n` +
                    `🎁 Remember to keep it secret and have fun gifting!\n` +
                    `🎄 Happy holidays! 🎄`
                );
                successCount++;
            } catch (error) {
                console.error(`Failed to send DM to ${santa}:`, error);
                failedUsers.push(santa);
            }
        }

        // Send summary message
        let summaryMessage = `🎄 **Pairs drawn successfully!** 🎄\n`;
        summaryMessage += `✅ ${successCount}/${pairs.length} DMs sent successfully\n`;

        if (failedUsers.length > 0) {
            summaryMessage += `\n⚠️ **Failed to send DMs to:**\n`;
            for (const userId of failedUsers) {
                summaryMessage += `<@${userId}> - Please enable DMs or contact an admin\n`;
            }
        }

        await message.channel.send(summaryMessage);

    } catch (error) {
        console.error('Error in draw command:', error);
        await message.channel.send('❌ Something went wrong while drawing pairs. Please try again!');
    }
};