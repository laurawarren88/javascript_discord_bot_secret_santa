import fs from 'fs/promises';

const STORAGE_PATH = './data/participants.json';

export const saveParticipants = async (participants) => {
    const participantsArray = Array.from(participants);
    await fs.mkdir('./data', { recursive: true });
    await fs.writeFile(STORAGE_PATH, JSON.stringify(participantsArray, null, 2));
};

export const loadParticipants = async () => {
    try {
        const data = await fs.readFile(STORAGE_PATH, 'utf8');
        return new Set(JSON.parse(data));
    } catch {
        return new Set();
    }
};

export const clearParticipants = async () => {
    try {
        await fs.writeFile(STORAGE_PATH, JSON.stringify([], null, 2));
        return new Set();
    } catch (error) {
        console.error('Error clearing participants:', error);
        throw error;
    }
};
