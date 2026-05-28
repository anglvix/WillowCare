import Workshop from '../models/Workshop.js'
import { getWorkshops } from '../services/activity-service.js'

const listEl = document.querySelector('#workshop-list')

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function renderCard(workshop) {
  return `
    <div class="border border-gray-100 rounded-2xl overflow-hidden shadow-sm bg-white flex flex-col justify-between">
      <img src="${workshop.image || 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=500&q=80'}"
        alt="${workshop.title}" class="h-40 w-full object-cover">
      <div class="p-4 flex-grow flex flex-col justify-between">
        <div>
          <p class="text-[10px] text-willow-dark font-bold uppercase mb-1">${formatDate(workshop.date)} - ${workshop.location}</p>
          <h3 class="font-bold text-sm text-gray-800 mb-2">${workshop.title}</h3>
          <p class="text-xs text-gray-500 line-clamp-2 mb-4">${workshop.description}</p>
        </div>
        <a href="selected_workshop.php?id=${workshop.id}"
          class="block text-center border border-willow-dark text-willow-dark py-2 rounded-xl text-xs font-semibold hover:bg-willow-cream transition">
          View Workshop
        </a>
      </div>
    </div>
  `
}

async function load() {
  const data = await getWorkshops()
  const workshops = data.map(Workshop.fromObject)
  if (!workshops.length) {
    listEl.innerHTML = '<p class="text-sm text-gray-400 col-span-3">Sem workshops disponíveis.</p>'
    return
  }
  listEl.innerHTML = workshops.map(renderCard).join('')
}

load()
