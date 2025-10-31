// Contains setDeadline command and deadline getter
let deadline = null;

export const setDeadline = (message, args) => {
    if (!message.member.permissions.has('Administrator')) {
        return message.reply('Only an admin can set the deadline.');
    }

    if (!args.length) {
        return message.reply('Please provide a date/time for the deadline (e.g., `#setDeadline 2024-12-15 18:00`).');
    }

    const date = new Date(args.join(' '));
    if (isNaN(date)) {
        return message.reply('Invalid date/time format. Please use a valid date.');
    }

    deadline = date;
    message.channel.send(`🎅 Deadline set to: ${date.toLocaleString()}`);
};

export const getDeadline = () => deadline;