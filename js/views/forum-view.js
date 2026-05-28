import ForumTopic from '../models/ForumTopic.js'
import { getTopics } from '../services/forum-service.js'

const listEl = document.querySelector('#topic-list')

function timeAgo(isoString) {
  const diff = Date.now() - new Date(isoString).getTime()
  const hours = Math.floor(diff / 3600000)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

function renderTopicCard(topic) {
  return `
    <article class="border border-gray-100 p-5 rounded-2xl bg-white shadow-sm hover:border-willow-mid transition">
      <span class="text-[9px] bg-willow-light text-willow-dark font-bold px-2 py-0.5 rounded uppercase tracking-wide">
        ${topic.category}
      </span>
      <h3 class="font-bold text-base text-gray-800 mt-2">${topic.title}</h3>
      <p class="text-xs text-gray-500 mt-1 line-clamp-1">${topic.content}</p>
      <div class="flex justify-between items-center mt-4 text-[10px] text-gray-400">
        <span>By ${topic.authorName} • ${timeAgo(topic.createdAt)}</span>
        <span>💬 ${topic.replyCount} replies</span>
      </div>
    </article>
  `
}

async function load() {
  const data = await getTopics()
  const topics = data.map(ForumTopic.fromObject)
  if (!topics.length) {
    listEl.innerHTML = '<p class="text-sm text-gray-400">Sem tópicos ainda.</p>'
    return
  }
  listEl.innerHTML = topics.map(renderTopicCard).join('')
}

load()
