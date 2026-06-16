import ForumTopic from '../models/ForumTopic.js'
import { addReply, createTopic, getTopicById, getTopics } from '../services/forum-service.js'
import { isLoggedIn } from '../services/auth-service.js'

const listEl = document.querySelector('#topic-list')
const newTopicBtn = document.querySelector('#btn-new-topic')
const filterEl = document.querySelector('#category-filter')
const modalEl = document.querySelector('#topic-modal')
const formEl = document.querySelector('#topic-form')
const cancelBtn = document.querySelector('#topic-cancel')
const cancelSecondaryBtn = document.querySelector('#topic-cancel-secondary')
const errorEl = document.querySelector('#topic-error')
const submitBtn = document.querySelector('#topic-submit')
const replyModalEl = document.querySelector('#reply-modal')
const replyListEl = document.querySelector('#reply-list')
const replyTopicTitleEl = document.querySelector('#reply-topic-title')
const replyFormEl = document.querySelector('#reply-form')
const replyContentEl = document.querySelector('#reply-content')
const replyErrorEl = document.querySelector('#reply-error')
const replySubmitBtn = document.querySelector('#reply-submit')
const replyCloseBtn = document.querySelector('#reply-close')
const replyCancelBtn = document.querySelector('#reply-cancel')
let activeTopicId = null

function timeAgo(isoString) {
  const diff = Date.now() - new Date(isoString).getTime()
  const hours = Math.floor(diff / 3600000)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

function renderTopicCard(topic) {
  return `
    <article data-topic-id="${topic.id}" class="border border-gray-100 p-5 rounded-2xl bg-white shadow-sm hover:border-willow-mid transition">
      <span class="text-[12px] bg-willow-light text-willow-dark font-bold px-2 py-0.5 rounded uppercase tracking-wide">
        ${topic.category}
      </span>
      <h3 class="font-bold text-base text-gray-800 mt-2">${topic.title}</h3>
      <p class="text-sm text-gray-500 mt-1 line-clamp-1">${topic.content}</p>
      <div class="flex justify-between items-center mt-4 text-[10px] text-gray-400">
        <span class="text-[13px] text-gray-500 font-medium">By ${topic.authorName} • ${timeAgo(topic.createdAt)}</span>
        <div class="flex items-center gap-2">
          <span class="text-[13px] text-gray-500 font-medium">${topic.replyCount} replies</span>
          <button data-action="open-replies" class="text-[13px] text-willow-dark font-bold hover:underline">View replies</button>
        </div>
      </div>
    </article>
  `
}

function renderReplyItem(reply) {
  return `
    <div class="border border-gray-100 rounded-xl p-3">
      <div class="flex justify-between items-center text-[10px] text-gray-400">
        <span>${reply.authorName}</span>
        <span>${timeAgo(reply.createdAt)}</span>
      </div>
      <p class="text-sm text-gray-700 mt-2">${reply.content}</p>
    </div>
  `
}

async function load() {
  const data = await getTopics()
  const topics = data.map(ForumTopic.fromObject)
  const selected = filterEl?.value ?? 'all'
  const filtered = selected === 'all'
    ? topics
    : topics.filter(t => t.category === selected)

  if (!filtered.length) {
    const emptyMsg = selected === 'all'
      ? 'No topics yet.'
      : 'No topics in this category yet.'
    listEl.innerHTML = `<p class="text-sm text-gray-400">${emptyMsg}</p>`
    return
  }
  listEl.innerHTML = filtered.map(renderTopicCard).join('')
}

function openModal() {
  if (!isLoggedIn()) {
    window.location.href = 'login.php'
    return
  }
  if (errorEl) errorEl.classList.add('hidden')
  formEl?.reset()
  modalEl?.classList.remove('hidden')
  modalEl?.classList.add('flex')
  document.body.classList.add('overflow-hidden')
}

function closeModal() {
  modalEl?.classList.add('hidden')
  modalEl?.classList.remove('flex')
  document.body.classList.remove('overflow-hidden')
}

async function openRepliesModal(topicId) {
  if (!isLoggedIn()) {
    window.location.href = 'login.php'
    return
  }
  activeTopicId = topicId
  if (replyErrorEl) replyErrorEl.classList.add('hidden')
  replyContentEl.value = ''
  replyListEl.innerHTML = '<p class="text-xs text-gray-400">Loading replies...</p>'
  replyModalEl?.classList.remove('hidden')
  replyModalEl?.classList.add('flex')
  document.body.classList.add('overflow-hidden')

  const topic = await getTopicById(topicId)
  if (!topic) {
    replyListEl.innerHTML = '<p class="text-xs text-red-500">Unable to load replies.</p>'
    return
  }

  if (replyTopicTitleEl) replyTopicTitleEl.textContent = topic.title
  if (!topic.replies?.length) {
    replyListEl.innerHTML = '<p class="text-xs text-gray-400">No replies yet.</p>'
    return
  }

  replyListEl.innerHTML = topic.replies.map(renderReplyItem).join('')
}

function closeRepliesModal() {
  replyModalEl?.classList.add('hidden')
  replyModalEl?.classList.remove('flex')
  document.body.classList.remove('overflow-hidden')
  activeTopicId = null
}

newTopicBtn?.addEventListener('click', openModal)
filterEl?.addEventListener('change', load)
cancelBtn?.addEventListener('click', closeModal)
cancelSecondaryBtn?.addEventListener('click', closeModal)
replyCloseBtn?.addEventListener('click', closeRepliesModal)
replyCancelBtn?.addEventListener('click', closeRepliesModal)

modalEl?.addEventListener('click', (e) => {
  if (e.target === modalEl) closeModal()
})

replyModalEl?.addEventListener('click', (e) => {
  if (e.target === replyModalEl) closeRepliesModal()
})

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return
  if (!replyModalEl?.classList.contains('hidden')) {
    closeRepliesModal()
    return
  }
  if (!modalEl?.classList.contains('hidden')) closeModal()
})

listEl?.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-action="open-replies"]')
  if (!btn) return
  const card = btn.closest('[data-topic-id]')
  const topicId = card?.getAttribute('data-topic-id')
  if (!topicId) return
  openRepliesModal(topicId)
})

formEl?.addEventListener('submit', async (e) => {
  e.preventDefault()
  if (!formEl || !submitBtn) return

  const title = formEl.querySelector('[name="title"]').value.trim()
  const category = formEl.querySelector('[name="category"]').value.trim()
  const content = formEl.querySelector('[name="content"]').value.trim()

  if (!title || !category || !content) return

  submitBtn.disabled = true
  submitBtn.textContent = 'Publishing...'
  if (errorEl) errorEl.classList.add('hidden')

  const result = await createTopic({ title, category, content })

  submitBtn.disabled = false
  submitBtn.textContent = 'Publish'

  if (!result.ok) {
    if (errorEl) errorEl.classList.remove('hidden')
    return
  }

  closeModal()
  load()
})

replyFormEl?.addEventListener('submit', async (e) => {
  e.preventDefault()
  if (!activeTopicId || !replySubmitBtn) return
  const content = replyContentEl.value.trim()
  if (!content) return

  replySubmitBtn.disabled = true
  replySubmitBtn.textContent = 'Posting...'
  if (replyErrorEl) replyErrorEl.classList.add('hidden')

  const result = await addReply(activeTopicId, content)

  replySubmitBtn.disabled = false
  replySubmitBtn.textContent = 'Reply'

  if (!result.ok) {
    if (replyErrorEl) replyErrorEl.classList.remove('hidden')
    return
  }

  await openRepliesModal(activeTopicId)
  load()
})

load()
