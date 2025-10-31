// Command to reset all participants (admin only)
import { clearParticipants } from '../utils/participantStorage.js';

export default async (message, participants) => {
    if (!message.member.permissions.has('Administrator')) {
        return message.reply('You need admin permissions to reset participants.');
    }

    const confirmationMessage = await message.channel.send(
        '⚠️ Are you sure you want to reset all participants? This cannot be undone!\n' +
        'React with ✅ to confirm or ❌ to cancel.'
    );

    await confirmationMessage.react('✅');
    await confirmationMessage.react('❌');

    const filter = (reaction, user) => {
        return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
    };

    try {
        const collected = await confirmationMessage.awaitReactions({ 
            filter, 
            max: 1, 
            time: 30000, 
            errors: ['time'] 
        });

        const reaction = collected.first();

        if (reaction.emoji.name === '✅') {
            participants.clear();
            await clearParticipants();
            await message.channel.send('🎄 All participants have been reset! Ready for a new Secret Santa event.');
        } else {
            await message.channel.send('❌ Reset cancelled.');
        }
    } catch (error) {
        await message.channel.send('❌ Reset timed out. No changes made.');
    }

    await confirmationMessage.delete().catch(() => {});
};