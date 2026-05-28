import { getSession, isLoggedIn, logout } from "../services/auth-service.js";
import { getVouchers, getProfile } from "../services/user-service.js";
import Voucher from "../models/Voucher.js";

// Página protegida - requer login
if (!isLoggedIn()) {
  window.location.href = "login.php";
}

const session = getSession();

// Preenche dados do perfil
document
  .querySelector("#user-name")
  ?.replaceWith(
    Object.assign(
      document.querySelector("#user-name") ?? document.createElement("span"),
      { textContent: session.name },
    ),
  );

async function loadDashboard() {
  const profile = await getProfile(session.id);
  if (!profile) return;

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
