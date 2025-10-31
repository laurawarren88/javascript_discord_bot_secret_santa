import ready from './ready.js';
import messageCreate from './messageCreate.js';

export const registerEvents = (client) => {
    console.log('Registering events...');

    client.on('ready', () => ready(client));
    client.on('messageCreate', (message) => messageCreate(client, message));
};