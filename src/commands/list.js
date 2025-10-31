// Command to list all participants (admin only)
export default async (message, participants) => {
    if (!message.member.permissions.has('Administrator')) {
        return message.reply('You need admin permissions to view the participant list.');
    }

    if (participants.size === 0) {
        return message.channel.send('🎄 No participants have joined yet!');
    }

    const participantList = [];
    for (const userId of participants) {
        try {
            const user = await message.client.users.fetch(userId);
            participantList.push(`• ${user.username}`);
        } catch (error) {
            participantList.push(`• Unknown User (${userId})`);
        }
    }

    const embed = {
        color: 0x00ff00,
        title: '🎅 Secret Santa Participants',
        description: participantList.join('\n'),
        footer: {
            text: `Total: ${participants.size} participants`
        },
        timestamp: new Date().toISOString()
    };

    await message.channel.send({ embeds: [embed] });
};