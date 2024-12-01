// Utility functions for pairing participants
export const shuffleAndPair = (participants) => {
    const shuffled = [...participants].sort(() => Math.random() - 0.5);
    return shuffled.map((santa, i) => ({
        santa,
        recipient: shuffled[(i + 1) % shuffled.length],
    }));
};