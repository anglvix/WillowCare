export default class Organization {
  constructor(name, initials, description, mission) {
    this.id = crypto.randomUUID()
    this.name = name
    this.initials = initials
    this.description = description
    this.mission = mission
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
    const o = new Organization(obj.name, obj.initials, obj.description, obj.mission)
    o.id = obj.id
    o.services = obj.services ?? []
    o.contactPhone = obj.contactPhone ?? ''
    o.contactEmail = obj.contactEmail ?? ''
    o.address = obj.address ?? ''
    return o
  }
}
