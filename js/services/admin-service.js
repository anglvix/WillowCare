const API_URL = 'http://localhost:3001';

export async function getUsers() {
    const response = await fetch(`${API_URL}/users`);

    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }

    return await response.json();
}

export async function updateDoctorApproval(userId, approvalStatus) {
    const response = await fetch(`${API_URL}/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approvalStatus })
    });

    if (!response.ok) {
        throw new Error('Failed to update doctor approval');
    }

    return await response.json();
}