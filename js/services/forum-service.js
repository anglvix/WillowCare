import { getToken, getSession } from "./auth-service.js";
import ForumTopic from "../models/ForumTopic.js";

const BASE = "http://localhost:3001";

// AuthHeaders.
function authHeaders() {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// Retrieve topics from the JSON server.
export async function getTopics() {
  const res = await fetch(`${BASE}/forumTopics`);
  if (!res.ok) return [];
  return res.json();
}

// Retrieve topic by id from the JSON server.
export async function getTopicById(id) {
  const res = await fetch(`${BASE}/forumTopics/${id}`);
  if (!res.ok) return null;
  return res.json();
}

// Create a new topic.
export async function createTopic({ title, category, content }) {
  const user = getSession();
  if (!user) return { ok: false, error: "Not authenticated" };

  const topic = new ForumTopic(title, category, content, user.id, user.name)

  const res = await fetch(`${BASE}/forumTopics`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(topic),
  });

  return { ok: res.ok };
}

// Nested replies in the topic - PATCH the replies array
export async function addReply(topicId, content) {
  const user = getSession();
  if (!user) return { ok: false, error: "Not authenticated" };

  const topic = await getTopicById(topicId);
  if (!topic) return { ok: false };

  const reply = {
    id: topic.replies.length + 1,
    authorId: user.id,
    authorName: user.name,
    content,
    createdAt: new Date().toISOString(),
  };

  const res = await fetch(`${BASE}/forumTopics/${topicId}`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify({ replies: [...topic.replies, reply] }),
  });

  return { ok: res.ok };
}
