import { getUsers, updateDoctorApproval } from '../services/admin-service.js';
import { getSession } from '../services/auth-service.js';

const session = getSession();

if (!session || session.role !== 'admin') {
    window.location.href = 'login.php';
}

const tableBody = document.querySelector('#user-table-body');

function renderStatus(user) {
    const status = user.approvalStatus || 'approved';
    const color = status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700';

    return `<span class="inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${color}">${status}</span>`;
}

function renderCertification(user) {
    if (!user.certification) {
        return '<span class="text-gray-400">No image uploaded</span>';
    }

    return `<img src="${user.certification}" alt="Certification for ${user.name}" class="h-16 w-16 rounded-xl border border-gray-200 object-cover" />`;
}

function renderAction(user) {
    if (user.role !== 'doctor' || (user.approvalStatus || 'approved') === 'approved') {
        return '<span class="text-[11px] text-gray-400">Approved</span>';
    }

    return `<button data-action="approve-doctor" data-user-id="${user.id}" class="rounded-xl bg-willow-dark px-3 py-1.5 text-[10px] font-semibold text-white hover:bg-willow-mid transition">Approve</button>`;
}

async function loadUsers() {
    if (!session || session.role !== 'admin') {
        return;
    }

    try {
        const users = await getUsers();

        tableBody.innerHTML = users.map((user) => `
            <tr class="border-b border-gray-100 align-top">
                <td class="px-4 py-4 text-xs text-gray-700">${user.id}</td>
                <td class="px-4 py-4 text-xs text-gray-700">${user.name}</td>
                <td class="px-4 py-4 text-xs text-gray-700">${user.email}</td>
                <td class="px-4 py-4 text-xs text-gray-700">${user.role}</td>
                <td class="px-4 py-4 text-xs text-gray-700">${user.specialty || '-'}</td>
                <td class="px-4 py-4">${renderStatus(user)}</td>
                <td class="px-4 py-4">${renderCertification(user)}</td>
                <td class="px-4 py-4">${renderAction(user)}</td>
            </tr>
        `).join('');

        tableBody.querySelectorAll('[data-action="approve-doctor"]').forEach((button) => {
            button.addEventListener('click', async () => {
                const userId = Number(button.dataset.userId);
                await updateDoctorApproval(userId, 'approved');
                await loadUsers();
            });
        });

    } catch (error) {
        console.error(error);

        tableBody.innerHTML = `
            <tr>
                <td colspan="8" class="px-6 py-4 text-center text-xs text-red-500">
                    Failed to load users
                </td>
            </tr>
        `;
    }
}

loadUsers();