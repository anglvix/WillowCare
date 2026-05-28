export default class ForumTopic {
  constructor(title, category, content, authorId, authorName) {
    this.id = crypto.randomUUID()
    this.title = title
    this.category = category
    this.content = content
    this.authorId = authorId
    this.authorName = authorName
    this.createdAt = new Date().toISOString()
    this.replies = []
  }

  get replyCount() {
    return this.replies.length
  }

  static fromObject(obj) {
    const t = new ForumTopic(obj.title, obj.category, obj.content, obj.authorId, obj.authorName)
    t.id = obj.id
    t.createdAt = obj.createdAt
    t.replies = obj.replies ?? []
    return t
  }
}
