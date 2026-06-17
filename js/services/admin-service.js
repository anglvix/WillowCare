const API_URL = 'http://localhost:3001';

// RequestJson.
async function requestJson(url, options = {}) {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }
    return response.json();
}

// Retrieve users from the API or state.
export async function getUsers() {
    return requestJson(`${API_URL}/users`);
}

// Delete or remove user.
export async function deleteUser(userId) {
    const response = await fetch(`${API_URL}/users/${userId}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to delete user');
    }
    return true;
}

// Update an existing user.
export async function updateUser(userId, patch) {
    return requestJson(`${API_URL}/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patch)
    });
}

// Update an existing doctorapproval.
export async function updateDoctorApproval(userId, approvalStatus) {
    return updateUser(userId, { approvalStatus });
}

// Create a new school.
export async function createSchool(school) {
    return requestJson(`${API_URL}/schools`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ...school,
            initials: school.initials || school.name.slice(0, 3).toUpperCase(),
            services: school.services || [],
            mission: school.mission || '',
            supportFeatures: school.supportFeatures || []
        })
    });
}

// Create a new workshop.
export async function createWorkshop(workshop) {
    return requestJson(`${API_URL}/workshops`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ...workshop,
            enrolledUsers: [],
            image: workshop.image || '',
            hostName: workshop.hostName || '',
            hostType: workshop.hostType || '',
            hostId: workshop.hostId || null
        })
    });
}

// Create a new excursion.
export async function createExcursion(excursion) {
    return requestJson(`${API_URL}/excursions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ...excursion,
            enrolledUsers: [],
            image: excursion.image || '',
            hostName: excursion.hostName || '',
            hostType: excursion.hostType || '',
            hostId: excursion.hostId || null
        })
    });
}
