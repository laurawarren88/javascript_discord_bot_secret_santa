import { saveParticipants } from '../utils/participantStorage.js';

export default async (message, participants) => {
    const { author, channel } = message;

    if (!participants.has(author.id)) {
        participants.add(author.id);
        await saveParticipants(participants);
        await channel.send(`${author.username}, you've successfully joined Secret Santa! 🎁`);
        console.log(`${author.username} has joined Secret Santa.`);
    } else {
        await channel.send(`Ho Ho Ho! 🎄 ${author.username}, you've already joined! Naughty, naughty!`);
        console.log(`${author.username} tried to join again.`);
    }
};