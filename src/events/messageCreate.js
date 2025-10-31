import joinCommand from '../commands/join.js';
import drawCommand from '../commands/draw.js';
import listCommand from '../commands/list.js';
import resetCommand from '../commands/reset.js';
import helpCommand from '../commands/help.js';
import statusCommand from '../commands/status.js';
import { getDeadline } from '../commands/deadline.js';
import { loadParticipants, saveParticipants } from '../utils/participantStorage.js';

const participants = await loadParticipants();
const validEmojis = [
    '🎅', '🎅🏻', '🎅🏼', '🎅🏽', '🎅🏾', '🎅🏿',
    '🧑‍🎄', '🧑🏻‍🎄', '🧑🏼‍🎄', '🧑🏽‍🎄', '🧑🏾‍🎄', '🧑🏿‍🎄',
    '🤶', '🤶🏻', '🤶🏼', '🤶🏽', '🤶🏾', '🤶🏿',
    '🧝', '🧝🏻', '🧝🏼', '🧝🏽', '🧝🏾', '🧝🏿',
    '🧝‍♂️', '🧝‍♀️'
];

const handleReactionJoin = async (message, emoji) => {
    const { author, channel } = message;

    const deadline = getDeadline();
    if (deadline && new Date() > deadline) {
        await channel.send('❌ The deadline for joining Secret Santa has passed!');
        return;
    }

    if (validEmojis.includes(emoji)) {
        if (!participants.has(author.id)) {
            participants.add(author.id);
            await saveParticipants(participants);
            await channel.send(`${author.username}, you've successfully joined Secret Santa! 🎁`);
        } else { 
            await channel.send(`Ho Ho Ho! 🎄 ${author.username}, you've already joined! Naughty, naughty!`);
        }
    } else {
        const emojiExamples = '🎅, 🧑‍🎄, 🧝‍♂️, 🧝‍♀️';
        await channel.send(`❌ ${author.username}, that's not a valid emoji! Use one of these to join: ${emojiExamples}`);
    }
};

export default async (client, message) => {
    if (message.author.bot) {
        return;
    }

    console.log(`Message received from ${message.author.username}: ${message.content}`);

    try {
        if (message.content === '!ping') {
            try {
                await message.channel.send('Pong! 🏓');
                console.log('Pong sent successfully.');
            } catch (error) {
                console.error('Error sending Pong:', error);
            }
        } else if (message.content === '#join') {
            try {
                // await message.channel.send('You tried to join Secret Santa!');
                await joinCommand(message, participants);
            } catch (error) {
                console.error('Error in join command:', error);
                await message.channel.send('🎄 Something went wrong. Please try again!');
            }
        } else if (message.content === '#draw') {
            await drawCommand(message, participants);
        } else if (message.content === '#list') {
            await listCommand(message, participants);
        } else if (message.content === '#reset') {
            await resetCommand(message, participants);
        } else if (message.content === '#help') {
            await helpCommand(message);
        } else if (message.content === '#status') {
            await statusCommand(message, participants);
        } else if (validEmojis.includes(message.content.trim())) {
            await handleReactionJoin(message, message.content.trim());
        } else {
            console.log('No matching command or valid emoji detected.');
        }
    } catch (error) {
        console.error('Error in messageCreate handler:', error);
    }
};