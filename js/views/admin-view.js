console.log('ADMIN LOADED');

import { getUsers } from '../services/admin-service.js';

const tableBody =
    document.querySelector('#user-table-body');

async function loadUsers() {

    try {

        const users = await getUsers();

        tableBody.innerHTML = users.map(user => `
            <tr>
                <td class="px-6 py-4">${user.id}</td>
                <td class="px-6 py-4">${user.name}</td>
                <td class="px-6 py-4">${user.email}</td>
                <td class="px-6 py-4">${user.role}</td>
                <td class="px-6 py-4">
                    -
                </td>
            </tr>
        `).join('');

    } catch(error) {

        console.error(error);

        tableBody.innerHTML = `
            <tr>
                <td colspan="5" class="px-6 py-4 text-center">
                    Failed to load users
                </td>
            </tr>
        `;
    }
}

loadUsers();