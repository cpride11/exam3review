// Function to fetch all characters from the Game Characters API
async function fetchCharacters() {
    try {
        const response = await fetch('/characters');
        if (!response.ok) {
            throw new Error('Failed to fetch characters');
        }
        const characters = await response.json();
        return characters;
    } catch (error) {
        console.error(error);
    }
}

// Function to add a new character via POST request
async function addCharacter(name, game) {
    try {
        const response = await fetch('/characters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, game })
        });
        if (!response.ok) {
            throw new Error('Failed to add character');
        }
        const newCharacter = await response.json();
        return newCharacter;
    } catch (error) {
        console.error(error);
    }
}

// Function to update an existing character via PUT request
async function updateCharacter(id, name, game) {
    try {
        const response = await fetch(`/characters/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, game })
        });
        if (!response.ok) {
            throw new Error('Failed to update character');
        }
        const updatedCharacter = await response.json();
        return updatedCharacter;
    } catch (error) {
        console.error(error);
    }
}

// Function to delete a character via DELETE request
async function deleteCharacter(id) {
    try {
        const response = await fetch(`/characters/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete character');
        }
    } catch (error) {
        console.error(error);
    }
}