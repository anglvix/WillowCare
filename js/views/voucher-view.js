import Voucher from '../models/Voucher.js'
import { getVouchers } from '../services/user-service.js'
import { getSession, isLoggedIn } from '../services/auth-service.js'

if (!isLoggedIn()) {
  window.location.href = 'login.php'
}

const listEl = document.querySelector('#voucher-list')
const session = getSession()

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('pt-PT', { day: '2-digit', month: 'long', year: 'numeric' })
}

function renderVoucher(voucher) {
  return `
    <div class="bg-willow-cream/10 border-2 border-dashed border-willow-mid rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">
      <div>
        <span class="text-[9px] bg-willow-dark text-white font-bold px-2 py-0.5 rounded tracking-wider uppercase">
          ${voucher.status === 'active' ? 'Active Booking' : voucher.status}
        </span>
        <h3 class="font-serif font-bold text-lg text-willow-dark mt-2">${voucher.activityTitle}</h3>
        <p class="text-xs text-gray-500 mt-1">📅 ${formatDate(voucher.date)} | 👤 ${session.name}</p>
      </div>
      <div class="text-center border-t sm:border-t-0 sm:border-l border-gray-200 pt-4 sm:pt-0 sm:pl-6 shrink-0">
        <span class="text-xs font-mono bg-gray-100 px-3 py-1.5 rounded text-gray-700 block font-bold tracking-widest">
          ${voucher.code}
        </span>
        <p class="text-[9px] text-gray-400 mt-1">Show code upon arrival</p>
      </div>
    </div>
  `
}

async function load() {
  const data = await getVouchers(session.id)
  const vouchers = data.map(Voucher.fromObject)

  if (!vouchers.length) {
    listEl.innerHTML = '<p class="text-sm text-gray-400">Sem reservas activas.</p>'
    return
  }
  listEl.innerHTML = vouchers.map(renderVoucher).join('')
}

load()
