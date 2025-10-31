// Help command to show all available commands
export default async (message) => {
    const embed = {
        color: 0xff0000,
        title: '🎅 Secret Santa Bot Commands',
        fields: [
            {
                name: '👥 User Commands',
                value: '`#join` - Join the Secret Santa event\n' +
                       '🎅 🧑‍🎄 🧝 - Join by sending Christmas emojis\n' +
                       '`#help` - Show this help message',
                inline: false
            },
            {
                name: '👑 Admin Commands',
                value: '`#draw` - Draw and assign Secret Santa pairs\n' +
                       '`#list` - View all participants\n' +
                       '`#reset` - Reset all participants\n' +
                       '`#setDeadline YYYY-MM-DD HH:mm` - Set gift deadline\n' +
                       '`#status` - Show event status',
                inline: false
            },
            {
                name: '📝 Example',
                value: '`#setDeadline 2025-12-20 18:00`',
                inline: false
            }
        ],
        footer: {
            text: 'Ho ho ho! 🎄'
        },
        timestamp: new Date().toISOString()
    };

    await message.channel.send({ embeds: [embed] });
};