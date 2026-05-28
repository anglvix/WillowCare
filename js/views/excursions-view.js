import Excursion from '../models/Excursion.js'
import { getExcursions } from '../services/activity-service.js'

const listEl = document.querySelector('#excursion-list')

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function renderCard(excursion) {
  return `
    <div class="border border-gray-100 rounded-2xl overflow-hidden shadow-sm bg-white flex flex-col justify-between">
      <img src="${excursion.image || 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=500&q=80'}"
        alt="${excursion.title}" class="h-40 w-full object-cover">
      <div class="p-4 flex-grow flex flex-col justify-between">
        <div>
          <p class="text-[10px] text-willow-mid font-bold uppercase mb-1">${formatDate(excursion.date)} - ${excursion.location}</p>
          <h3 class="font-bold text-sm text-gray-800 mb-2">${excursion.title}</h3>
          <p class="text-xs text-gray-500 mb-4">${excursion.description}</p>
        </div>
        <a href="selected_activity.php?id=${excursion.id}"
          class="block text-center border border-willow-mid text-willow-dark py-2 rounded-xl text-xs font-semibold hover:bg-willow-cream transition">
          View Event
        </a>
      </div>
    </div>
  `
}

async function load() {
  const data = await getExcursions()
  const excursions = data.map(Excursion.fromObject)
  if (!excursions.length) {
    listEl.innerHTML = '<p class="text-sm text-gray-400 col-span-3">Sem excursões disponíveis.</p>'
    return
  }
  listEl.innerHTML = excursions.map(renderCard).join('')
}

load()
