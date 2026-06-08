import { getUsers, updateDoctorApproval } from '../services/admin-service.js';
import { getSession } from '../services/auth-service.js';

const session = getSession();

if (!session || session.role !== 'admin') {
    window.location.href = 'login.php';
}

const pendingList = document.querySelector('#pending-doctors-list');
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

    return `
        <a href="${user.certification}" target="_blank" rel="noopener noreferrer" class="inline-block rounded-xl border border-gray-200 bg-white p-1 shadow-sm hover:border-willow-mid transition">
            <img src="${user.certification}" alt="Certification for ${user.name}" class="h-24 w-24 rounded-lg object-cover md:h-28 md:w-28" />
        </a>
    `;
}

function renderAction(user) {
    if (user.role !== 'doctor' || (user.approvalStatus || 'approved') === 'approved') {
        return '<span class="text-[11px] text-gray-400">Approved</span>';
    }

    return `<button data-action="approve-doctor" data-user-id="${user.id}" class="rounded-xl bg-willow-dark px-3 py-1.5 text-[10px] font-semibold text-white hover:bg-willow-mid transition">Approve</button>`;
}

async function approveDoctor(userId) {
    await updateDoctorApproval(userId, 'approved');
    await loadUsers();
}

async function loadUsers() {
    if (!session || session.role !== 'admin') {
        return;
    }

    try {
        const users = await getUsers();
        const pendingDoctors = users.filter((user) => user.role === 'doctor' && (user.approvalStatus || 'approved') === 'pending');

        pendingList.innerHTML = pendingDoctors.length
            ? pendingDoctors.map((user) => `
                <article class="rounded-2xl border border-amber-100 bg-amber-50 p-5 shadow-sm">
                    <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div class="space-y-1 text-sm text-gray-700">
                            <p class="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-semibold">Doctor application</p>
                            <h3 class="text-base font-semibold text-willow-dark">${user.name}</h3>
                            <p class="text-xs text-gray-500">${user.email}</p>
                            <p class="text-xs text-gray-500">Specialty: ${user.specialty || 'Not provided'}</p>
                            <p class="text-[11px] text-gray-400">Password is hidden from the admin view.</p>
                        </div>
                        <div class="flex flex-col gap-3">
                            ${renderCertification(user)}
                            <button data-action="approve-doctor" data-user-id="${user.id}" class="rounded-xl bg-willow-dark px-4 py-2 text-[11px] font-semibold text-white hover:bg-willow-mid transition">Accept Doctor Account</button>
                        </div>
                    </div>
                </article>
            `).join('')
            : '<p class="text-sm text-gray-400">No pending doctor applications right now.</p>';

        pendingList.querySelectorAll('[data-action="approve-doctor"]').forEach((button) => {
            button.addEventListener('click', async () => {
                await approveDoctor(Number(button.dataset.userId));
            });
        });

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
                await approveDoctor(Number(button.dataset.userId));
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