import { getUsers, deleteUser, updateUser, updateDoctorApproval, createSchool, createWorkshop, createExcursion } from '../services/admin-service.js';
import { getSession } from '../services/auth-service.js';

const session = getSession();

if (!session || session.role !== 'admin') {
    window.location.href = 'login.php';
}

const pendingList = document.querySelector('#pending-doctors-list');
const tableBody = document.querySelector('#user-table-body');
const schoolForm = document.querySelector('#school-form');
const activityForm = document.querySelector('#activity-form');
const schoolStatus = document.querySelector('#school-form-status');
const activityStatus = document.querySelector('#activity-form-status');

const roleOptions = [
    { value: 'caregiver', label: 'Caregiver' },
    { value: 'doctor', label: 'Doctor' },
    { value: 'school', label: 'School' },
    { value: 'organization', label: 'Organization' },
    { value: 'admin', label: 'Admin' }
];

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

function renderRoleEditor(user) {
    return `
        <div class="space-y-2">
            <label class="block text-[11px] font-semibold text-gray-500 uppercase">Role</label>
            <div class="flex flex-col gap-2 sm:flex-row sm:items-center">
                <select data-action="role-select" data-user-id="${user.id}" class="grow rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700 shadow-sm focus:border-willow-mid focus:ring-2 focus:ring-willow-100">
                    ${roleOptions
                        .map((role) => `<option value="${role.value}" ${role.value === user.role ? 'selected' : ''}>${role.label}</option>`)
                        .join('')}
                </select>
                <button data-action="update-role" data-user-id="${user.id}" class="rounded-xl bg-willow-dark px-3 py-2 text-[10px] font-semibold text-white hover:bg-willow-mid transition">Save</button>
            </div>
        </div>
    `;
}

function renderUserActions(user) {
    const approveButton = user.role === 'doctor' && (user.approvalStatus || 'approved') === 'pending'
        ? `<button data-action="approve-doctor" data-user-id="${user.id}" class="rounded-xl bg-willow-dark px-3 py-2 text-[10px] font-semibold text-white hover:bg-willow-mid transition">Approve</button>`
        : '<span class="text-[11px] text-gray-400">No pending actions</span>';

    const deleteButton = user.id === session.id
        ? '<span class="text-[11px] text-gray-400">Current admin</span>'
        : `<button data-action="delete-user" data-user-id="${user.id}" class="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-[10px] font-semibold text-red-700 hover:bg-red-100 transition">Delete</button>`;

    return `
        <div class="space-y-3">
            ${renderRoleEditor(user)}
            <div class="flex flex-wrap gap-2">
                ${approveButton}
                ${deleteButton}
            </div>
        </div>
    `;
}

function showMessage(element, message, isError = false) {
    if (!element) return;
    element.textContent = message;
    element.classList.toggle('text-red-600', isError);
    element.classList.toggle('text-emerald-600', !isError);
    element.classList.remove('hidden');
}

function clearMessage(element) {
    if (!element) return;
    element.textContent = '';
    element.classList.add('hidden');
}

async function approveDoctor(userId) {
    await updateDoctorApproval(userId, 'approved');
    await loadUsers();
}

async function deleteUserHandler(userId) {
    if (!confirm('Delete this user account? This action cannot be undone.')) return;
    await deleteUser(userId);
    await loadUsers();
}

async function updateUserRoleHandler(userId) {
    const select = tableBody.querySelector(`[data-action="role-select"][data-user-id="${userId}"]`);
    if (!select) return;
    const newRole = select.value;
    const row = select.closest('tr');

    if (userId === session.id && newRole !== 'admin') {
        alert('You cannot demote yourself from the current admin account while signed in.');
        select.value = 'admin';
        return;
    }

    const patch = { role: newRole };
    if (newRole === 'doctor') {
        patch.approvalStatus = 'approved';
        patch.specialty = row?.dataset.userSpecialty || 'General';
    }

    await updateUser(userId, patch);
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
            <tr class="border-b border-gray-100 align-top" data-user-specialty="${user.specialty || ''}" data-user-role="${user.role}">
                <td class="px-4 py-4 text-xs text-gray-700">${user.id}</td>
                <td class="px-4 py-4 text-xs text-gray-700">${user.name}</td>
                <td class="px-4 py-4 text-xs text-gray-700">${user.email}</td>
                <td class="px-4 py-4 text-xs text-gray-700">${user.role}</td>
                <td class="px-4 py-4 text-xs text-gray-700">${user.specialty || '-'}</td>
                <td class="px-4 py-4">${renderStatus(user)}</td>
                <td class="px-4 py-4">${renderCertification(user)}</td>
                <td class="px-4 py-4">${renderUserActions(user)}</td>
            </tr>
        `).join('');

        tableBody.querySelectorAll('[data-action="approve-doctor"]').forEach((button) => {
            button.addEventListener('click', async () => {
                await approveDoctor(Number(button.dataset.userId));
            });
        });

        tableBody.querySelectorAll('[data-action="update-role"]').forEach((button) => {
            button.addEventListener('click', async () => {
                await updateUserRoleHandler(Number(button.dataset.userId));
            });
        });

        tableBody.querySelectorAll('[data-action="delete-user"]').forEach((button) => {
            button.addEventListener('click', async () => {
                await deleteUserHandler(Number(button.dataset.userId));
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

schoolForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!schoolForm) return;
    clearMessage(schoolStatus);

    const formData = new FormData(schoolForm);
    const name = formData.get('school-name')?.toString().trim();
    const district = formData.get('school-district')?.toString().trim();
    const location = formData.get('school-location')?.toString().trim();
    const type = formData.get('school-type')?.toString().trim();
    const description = formData.get('school-description')?.toString().trim();
    const features = formData.get('school-features')?.toString().trim();

    if (!name || !district || !location) {
        showMessage(schoolStatus, 'Please fill in the school name, district, and location.', true);
        return;
    }

    try {
        await createSchool({
            name,
            district,
            location,
            type,
            description,
            supportFeatures: features ? features.split(',').map((item) => item.trim()).filter(Boolean) : []
        });
        showMessage(schoolStatus, 'School created successfully.');
        schoolForm.reset();
    } catch (error) {
        showMessage(schoolStatus, 'Unable to create school. Please try again.', true);
        console.error(error);
    }
});

activityForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!activityForm) return;
    clearMessage(activityStatus);

    const formData = new FormData(activityForm);
    const type = formData.get('activity-type')?.toString();
    const title = formData.get('activity-title')?.toString().trim();
    const date = formData.get('activity-date')?.toString();
    const location = formData.get('activity-location')?.toString().trim();
    const description = formData.get('activity-description')?.toString().trim();
    const category = formData.get('activity-category')?.toString().trim();
    const ageGroup = formData.get('activity-age-group')?.toString().trim();
    const sensoryFocus = formData.get('activity-sensory-focus')?.toString().trim();
    const image = formData.get('activity-image')?.toString().trim();
    const hostName = formData.get('activity-host-name')?.toString().trim();
    const hostType = formData.get('activity-host-type')?.toString();
    const hostIdValue = formData.get('activity-host-id')?.toString().trim();
    const hostId = hostIdValue ? Number(hostIdValue) : null;

    if (!type || !title || !date || !location || !description || !category) {
        showMessage(activityStatus, 'Please fill in the required activity fields.', true);
        return;
    }

    try {
        if (type === 'workshop') {
            await createWorkshop({ title, date, location, description, category, ageGroup: ageGroup || 'All ages', image, hostName, hostType, hostId });
        } else {
            await createExcursion({ title, date, location, description, sensoryFocus: sensoryFocus || 'general', image, hostName, hostType, hostId });
        }
        showMessage(activityStatus, `${type === 'workshop' ? 'Workshop' : 'Excursion'} created successfully.`);
        activityForm.reset();
    } catch (error) {
        showMessage(activityStatus, 'Unable to create activity. Please try again.', true);
        console.error(error);
    }
});

loadUsers();
