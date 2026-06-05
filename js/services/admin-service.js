const API_URL = 'http://localhost:3001';

export async function getDashboardData() {
    const response = await fetch(API_URL + '/');
    return response.json();
}

export async function getUsers() {
    const response = await fetch(API_URL + '/users');
    return response.json();
}

export async function deleteUser(id) {
    return fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE'
    });
}