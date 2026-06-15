import { getSession, isLoggedIn, logout, getRoleLabel, saveSessionData } from "../services/auth-service.js";
import { getVouchers, getProfile, updateProfile } from "../services/user-service.js";
import Voucher from "../models/Voucher.js";

// Página protegida - requer login
if (!isLoggedIn()) {
  window.location.href = "login.php";
}

let session = getSession();

if (session) {
  document.querySelector("#user-role-badge")?.replaceWith(
    Object.assign(document.querySelector("#user-role-badge") ?? document.createElement("p"), {
      textContent: getRoleLabel(session.role),
      className: "text-[10px] bg-willow-light text-willow-dark px-2 py-0.5 rounded-full inline-block mt-1 font-semibold uppercase",
    }),
  );
}

const avatarContainer = document.querySelector('#profile-avatar');
const avatarFileInput = document.querySelector('#avatar-file');
const avatarUploadButton = document.querySelector('#avatar-upload-button');
const avatarFileName = document.querySelector('#avatar-file-name');
const avatarStatus = document.querySelector('#avatar-status');
const defaultAvatarUrl = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';

// Preenche dados do perfil
document
  .querySelector("#user-name")
  ?.replaceWith(
    Object.assign(
      document.querySelector("#user-name") ?? document.createElement("span"),
      { textContent: session.name },
    ),
  );

function setAvatarImage(url) {
  if (!avatarContainer) return;
  avatarContainer.style.backgroundImage = `url('${url || defaultAvatarUrl}')`;
}

function showAvatarStatus(message, isError = false) {
  if (!avatarStatus) return;
  avatarStatus.textContent = message;
  avatarStatus.classList.remove('hidden');
  avatarStatus.classList.toggle('text-red-600', isError);
  avatarStatus.classList.toggle('text-emerald-600', !isError);
}

function clearAvatarStatus() {
  if (!avatarStatus) return;
  avatarStatus.textContent = '';
  avatarStatus.classList.add('hidden');
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

async function handleAvatarUpload(event) {
  event.preventDefault();
  clearAvatarStatus();

  if (!avatarFileInput?.files?.length) {
    showAvatarStatus('Please choose an image file to upload.', true);
    return;
  }

  const file = avatarFileInput.files[0];
  if (!file.type.startsWith('image/')) {
    showAvatarStatus('Only image files are allowed.', true);
    return;
  }

  try {
    const imageDataUrl = await readFileAsDataUrl(file);
    const updatedProfile = await updateProfile(session.id, { avatar: imageDataUrl });

    setAvatarImage(updatedProfile.avatar || defaultAvatarUrl);
    session.avatar = updatedProfile.avatar;
    saveSessionData(session);
    avatarFileInput.value = '';
    showAvatarStatus('Profile picture updated successfully.');
  } catch (error) {
    console.error(error);
    showAvatarStatus('Unable to update profile picture. Please try again.', true);
  }
}

avatarFileInput?.addEventListener('change', () => {
  if (!avatarFileInput?.files?.length) {
    if (avatarFileName) avatarFileName.textContent = 'No file selected';
    return;
  }
  if (avatarFileName) avatarFileName.textContent = avatarFileInput.files[0].name;
});

avatarUploadButton?.addEventListener('click', handleAvatarUpload);

async function loadDashboard() {
  const profile = await getProfile(session.id);
  if (!profile) return;

  setAvatarImage(profile.avatar || defaultAvatarUrl);
  if (profile.avatar) {
    session.avatar = profile.avatar;
    saveSessionData(session);
  }

  const vouchers = await getVouchers(session.id);

  // Estatísticas
  document.querySelector("#stat-bookings")?.replaceWith(
    Object.assign(document.createElement("span"), {
      id: "stat-bookings",
      className: "text-2xl font-bold text-willow-dark",
      textContent: vouchers.length,
    }),
  );

  document.querySelector("#stat-doctors")?.replaceWith(
    Object.assign(document.createElement("span"), {
      id: "stat-doctors",
      className: "text-2xl font-bold text-willow-mid",
      textContent: profile.savedDoctors.length,
    }),
  );

  document.querySelector("#stat-schools")?.replaceWith(
    Object.assign(document.createElement("span"), {
      id: "stat-schools",
      className: "text-2xl font-bold text-willow-mid",
      textContent: profile.savedSchools?.length ?? 0,
    }),
  );

  document.querySelector("#stat-organizations")?.replaceWith(
    Object.assign(document.createElement("span"), {
      id: "stat-organizations",
      className: "text-2xl font-bold text-willow-mid",
      textContent: profile.savedOrganizations?.length ?? 0,
    }),
  );

  // Conquistas
  const achievementsEl = document.querySelector("#achievements-list");
  if (achievementsEl && profile.achievements.length) {
    const labels = {
      registered: "Conta criada",
      first_booking: "Primeira inscrição",
      saved_doctor: "Médico guardado",
      saved_school: "Escola guardada",
      saved_organization: "Organização guardada",
      first_review: "Avaliação submetida",
    };
    achievementsEl.innerHTML = profile.achievements
      .map((a) => `<li>🏅 ${labels[a] ?? a}</li>`)
      .join("");
  }
}

loadDashboard();

// Logout
document.querySelector("#btn-logout")?.addEventListener("click", () => {
  logout();
  window.location.href = "index.php";
});

const settingsButton = document.querySelector('#open-settings-button');
const settingsModal = document.querySelector('#account-settings-modal');
const settingsOverlay = document.querySelector('#account-settings-overlay');
const settingsForm = document.querySelector('#account-settings-form');
const settingsStatus = document.querySelector('#settings-status');
const closeSettingsButton = document.querySelector('#close-settings-button');
const cancelSettingsButton = document.querySelector('#cancel-settings-button');
const settingsNameInput = document.querySelector('#settings-name');
const settingsEmailInput = document.querySelector('#settings-email');
const settingsPhoneInput = document.querySelector('#settings-phone');
const settingsAddressInput = document.querySelector('#settings-address');
const settingsPasswordInput = document.querySelector('#settings-password');

function setSettingsStatus(message, isError = false) {
  if (!settingsStatus) return;
  settingsStatus.textContent = message;
  settingsStatus.classList.toggle('text-red-600', isError);
  settingsStatus.classList.toggle('text-emerald-600', !isError);
}

function openSettingsModal() {
  if (!settingsModal || !settingsOverlay) return;
  settingsModal.classList.remove('hidden');
  settingsModal.classList.add('flex');
  settingsOverlay.classList.remove('hidden');
  settingsNameInput.value = session.name || '';
  settingsEmailInput.value = session.email || '';
  settingsPhoneInput.value = session.phone || '';
  settingsAddressInput.value = session.address || '';
  settingsPasswordInput.value = '';
  setSettingsStatus('');
}

function closeSettingsModal() {
  if (!settingsModal || !settingsOverlay) return;
  settingsModal.classList.add('hidden');
  settingsModal.classList.remove('flex');
  settingsOverlay.classList.add('hidden');
}

settingsButton?.addEventListener('click', openSettingsModal);
closeSettingsButton?.addEventListener('click', closeSettingsModal);
cancelSettingsButton?.addEventListener('click', closeSettingsModal);
settingsOverlay?.addEventListener('click', closeSettingsModal);

settingsForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  setSettingsStatus('Saving changes...', false);

  const updatedName = settingsNameInput.value.trim();
  const updatedEmail = settingsEmailInput.value.trim();
  const updatedPhone = settingsPhoneInput.value.trim();
  const updatedAddress = settingsAddressInput.value.trim();
  const newPassword = settingsPasswordInput.value;

  const patch = {};
  if (updatedName && updatedName !== session.name) patch.name = updatedName;
  if (updatedEmail && updatedEmail !== session.email) patch.email = updatedEmail;
  if (updatedPhone !== session.phone) patch.phone = updatedPhone;
  if (updatedAddress !== session.address) patch.address = updatedAddress;
  if (newPassword) patch.password = newPassword;

  if (!Object.keys(patch).length) {
    setSettingsStatus('No changes were made.', true);
    return;
  }

  try {
    const updatedProfile = await updateProfile(session.id, patch);
    session = { ...session, ...updatedProfile };
    saveSessionData(session);

    document.querySelector('#user-name')?.replaceWith(
      Object.assign(document.createElement('h2'), {
        id: 'user-name',
        className: 'text-lg font-serif font-bold text-willow-dark mt-4',
        textContent: session.name,
      }),
    );

    setSettingsStatus('Your account settings were updated successfully.', false);
    setTimeout(closeSettingsModal, 1200);
  } catch (error) {
    console.error(error);
    setSettingsStatus('Unable to save changes. Please try again.', true);
  }
});
