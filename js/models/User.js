export default class User {
  constructor(name, email, role = 'caregiver') {
    this.id = crypto.randomUUID()
    this.name = name
    this.email = email
    this.role = role
    this.avatar = ''
    this.savedDoctors = []
    this.savedSchools = []
    this.achievements = []
  }

  hasAchievement(key) {
    return this.achievements.includes(key)
  }

  addAchievement(key) {
    if (!this.hasAchievement(key)) {
      this.achievements.push(key)
    }
  }

  static fromObject(obj) {
    const u = new User(obj.name, obj.email, obj.role)
    u.id = obj.id
    u.avatar = obj.avatar ?? ''
    u.savedDoctors = obj.savedDoctors ?? []
    u.savedSchools = obj.savedSchools ?? []
    u.achievements = obj.achievements ?? []
    return u
  }
}
