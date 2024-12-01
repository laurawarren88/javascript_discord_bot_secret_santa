// Command for the admin to draw Secret Santa pairs
import { shuffleAndPair } from '../utils/pairing.js';

export default (message, participants) => {
    if (!message.member.permissions.has('ADMINISTRATOR')) {
        return message.reply('You need admin permissions to run this command.');
    }

    if (participants.size < 2) {
        return message.channel.send('Not enough participants to draw pairs. Add more participants first!');
    }

    const pairs = shuffleAndPair([...participants]);
    pairs.forEach(({ santa, recipient }) => {
        message.client.users.fetch(santa).then((user) => {
            user.send(`Ho ho ho! You are the Secret Santa for <@${recipient}>! 🎁. Happy gifting! 🎁🎅`)
            .catch(() => {
                message.channel.send(`<@${santa}>: I couldn't send you a DM. Please enable DMs or contact an admin.`);
            });
        });
    });

    message.channel.send('Pairs have been drawn and DMs sent! 🎄');
};