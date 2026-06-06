export default class Excursion {
  constructor(title, date, location, description, sensoryFocus = '', hostName = '', hostType = '', hostId = null) {
    this.id = crypto.randomUUID()
    this.title = title
    this.date = date
    this.location = location
    this.description = description
    this.sensoryFocus = sensoryFocus
    this.image = ''
    this.enrolledUsers = []
    this.hostName = hostName
    this.hostType = hostType
    this.hostId = hostId
  }

  isEnrolled(userId) {
    return this.enrolledUsers.includes(userId)
  }

  static fromObject(obj) {
    const e = new Excursion(obj.title, obj.date, obj.location, obj.description, obj.sensoryFocus, obj.hostName, obj.hostType, obj.hostId)
    e.id = obj.id
    e.image = obj.image ?? ''
    e.enrolledUsers = obj.enrolledUsers ?? []
    e.hostName = obj.hostName ?? ''
    e.hostType = obj.hostType ?? ''
    e.hostId = obj.hostId ?? null
    return e
  }
}
