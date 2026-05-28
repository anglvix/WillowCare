export default class Workshop {
  constructor(title, date, location, description, ageGroup, category = 'Interactive Workshop') {
    this.id = crypto.randomUUID()
    this.title = title
    this.date = date
    this.location = location
    this.description = description
    this.ageGroup = ageGroup
    this.category = category
    this.image = ''
    this.enrolledUsers = []
  }

  isEnrolled(userId) {
    return this.enrolledUsers.includes(userId)
  }

  static fromObject(obj) {
    const w = new Workshop(obj.title, obj.date, obj.location, obj.description, obj.ageGroup, obj.category)
    w.id = obj.id
    w.image = obj.image ?? ''
    w.enrolledUsers = obj.enrolledUsers ?? []
    return w
  }
}
