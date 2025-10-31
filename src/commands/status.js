// Command to show current event status
import { getDeadline } from './deadline.js';

export default async (message, participants) => {
    const deadline = getDeadline();
    const now = new Date();
    
    let deadlineText = 'No deadline set';
    let timeLeftText = '';
    
    if (deadline) {
        deadlineText = deadline.toLocaleString();
        const timeLeft = deadline - now;
        
        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            timeLeftText = `⏰ Time left: ${days} days, ${hours} hours`;
        } else {
            timeLeftText = '⚠️ Deadline has passed!';
        }
    }

    const embed = {
        color: deadline && now > deadline ? 0xff0000 : 0x00ff00,
        title: '🎄 Secret Santa Event Status',
        fields: [
            {
                name: '👥 Participants',
                value: `${participants.size} people joined`,
                inline: true
            },
            {
                name: '📅 Deadline',
                value: deadlineText,
                inline: true
            },
            {
                name: '⏱️ Status',
                value: timeLeftText || 'Ready to set deadline',
                inline: false
            }
        ],
        footer: {
            text: participants.size >= 2 ? 'Ready to draw pairs!' : 'Need at least 2 participants'
        },
        timestamp: new Date().toISOString()
    };

    await message.channel.send({ embeds: [embed] });
};