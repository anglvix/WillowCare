export default class Excursion {
  constructor(title, date, location, description, sensoryFocus = '') {
    this.id = crypto.randomUUID()
    this.title = title
    this.date = date
    this.location = location
    this.description = description
    this.sensoryFocus = sensoryFocus
    this.image = ''
    this.enrolledUsers = []
  }

  isEnrolled(userId) {
    return this.enrolledUsers.includes(userId)
  }

  static fromObject(obj) {
    const e = new Excursion(obj.title, obj.date, obj.location, obj.description, obj.sensoryFocus)
    e.id = obj.id
    e.image = obj.image ?? ''
    e.enrolledUsers = obj.enrolledUsers ?? []
    return e
  }
}
