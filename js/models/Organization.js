export default class Organization {
  constructor(name, initials, description, mission, avatar = '') {
    this.id = crypto.randomUUID()
    this.name = name
    this.initials = initials
    this.description = description
    this.mission = mission
    this.avatar = avatar
    this.services = []
    this.contactPhone = ''
    this.contactEmail = ''
    this.address = ''
  }

  get contact() {
    const parts = []
    if (this.contactPhone) parts.push(this.contactPhone)
    if (this.contactEmail) parts.push(this.contactEmail)
    return parts.join(' | ')
  }

  static fromObject(obj) {
    const o = new Organization(obj.name, obj.initials, obj.description, obj.mission, obj.avatar ?? '')
    o.id = obj.id
    o.services = obj.services ?? []
    o.contactPhone = obj.contactPhone ?? ''
    o.contactEmail = obj.contactEmail ?? ''
    o.address = obj.address ?? ''
    o.avatar = obj.avatar ?? o.avatar
    return o
  }
}
