import Admin from '../models/Admin.js';
import {
    getUsers,
    deleteUser
} from '../services/admin-service.js';

const statsContainer =
    document.querySelector('#admin-stats');

const userTable =
    document.querySelector('#user-table-body');
    
async function renderStats() {
    const stats = await Admin.getStats();
    statsContainer.innerHTML = `
    <div class="p-6 bg-white rounded-lg shadow">
        <h3 class="text-sm text-gray-500">Users</h3>
        <p class="text-3xl font-bold">${stats.users}</p>
    </div>

    <div class="p-6 bg-white rounded-lg shadow">
        <h3 class="text-sm text-gray-500">Doctors</h3>
        <p class="text-3xl font-bold">${stats.doctors}</p>
    </div>

    <div class="p-6 bg-white rounded-lg shadow">
        <h3 class="text-sm text-gray-500">Schools</h3>
        <p class="text-3xl font-bold">${stats.schools}</p>
    </div>

    <div class="p-6 bg-white rounded-lg shadow">
        <h3 class="text-sm text-gray-500">Workshops</h3>
        <p class="text-3xl font-bold">${stats.workshops}</p>
    </div>

    <div class="p-6 bg-white rounded-lg shadow">
        <h3 class="text-sm text-gray-500">Excursions</h3>
        <p class="text-3xl font-bold">${stats.excursions}</p>
    </div>

    <div class="p-6 bg-white rounded-lg shadow">
        <h3 class="text-sm text-gray-500">Forum Topics</h3>
        <p class="text-3xl font-bold">${stats.topics}</p>
    </div>
    `;
}

async function renderUsers() {
    const users = await getUsers();
    userTable.innerHTML = users.map(user => `
        <tr>
            <td class="px-6 py-4">${user.id}</td>
            <td class="px-6 py-4">${user.name}</td>
            <td class="px-6 py-4">${user.email}</td>
            <td class="px-6 py-4">${user.role}</td>

            <td class="px-6 py-4">
                <button
                    class="delete-user bg-red-500 text-white px-3 py-1 rounded"
                    data-id="${user.id}">
                    Delete
                </button>
            </td>
        </tr>
    `).join('');
}

document.addEventListener('click', async (e) => {
    if (!e.target.classList.contains('delete-user'))
        return;
    const id = e.target.dataset.id;
    await deleteUser(id);
    renderUsers();
});

renderStats();
renderUsers();