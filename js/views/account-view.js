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
const avatarForm = document.querySelector('#avatar-form');
const avatarFileInput = document.querySelector('#avatar-file');
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

avatarForm?.addEventListener('submit', handleAvatarUpload);

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

  // Conquistas
  const achievementsEl = document.querySelector("#achievements-list");
  if (achievementsEl && profile.achievements.length) {
    const labels = {
      registered: "Conta criada",
      first_booking: "Primeira inscrição",
      saved_doctor: "Médico guardado",
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
