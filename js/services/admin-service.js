const API_URL = 'http://localhost:3001';

export async function getUsers() {
    const response = await fetch(`${API_URL}/users`);

    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }

    return await response.json();
}