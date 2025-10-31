// Utility functions for pairing participants
export const shuffleAndPair = (participants) => {
    if (participants.length < 2) {
        throw new Error('Need at least 2 participants to create pairs');
    }

    // Fisher-Yates shuffle for better randomization
    const shuffled = [...participants];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Create pairs ensuring no one gets themselves
    const pairs = [];
    for (let i = 0; i < shuffled.length; i++) {
        const santa = shuffled[i];
        const recipient = shuffled[(i + 1) % shuffled.length];
        
        // Extra check to ensure no self-assignment (shouldn't happen with circular pairing)
        if (santa === recipient && shuffled.length > 1) {
            throw new Error('Self-assignment detected - this should not happen');
        }
        
        pairs.push({ santa, recipient });
    }

    return pairs;
};

// Validate pairs to ensure everyone gives and receives exactly once
export const validatePairs = (pairs) => {
    const santas = new Set();
    const recipients = new Set();
    
    for (const { santa, recipient } of pairs) {
        if (santas.has(santa)) {
            throw new Error(`Duplicate santa: ${santa}`);
        }
        if (recipients.has(recipient)) {
            throw new Error(`Duplicate recipient: ${recipient}`);
        }
        santas.add(santa);
        recipients.add(recipient);
    }
    
    return pairs.length === santas.size && pairs.length === recipients.size;
};