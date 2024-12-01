import fs from 'fs/promises';

export const saveParticipants = async (participants) => {
    const participantsArray = Array.from(participants);
    await fs.mkdir('./data', { recursive: true });
    await fs.writeFile('./data/participants.json', JSON.stringify(participantsArray, null, 2));
};

export const loadParticipants = async () => {
    try {
        const data = await fs.readFile(STORAGE_PATH, 'utf8');
        return new Set(JSON.parse(data));
    } catch {
        return new Set();
    }
};
