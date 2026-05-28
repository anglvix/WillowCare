export default class Organization {
  constructor(name, initials, description, mission) {
    this.id = crypto.randomUUID()
    this.name = name
    this.initials = initials
    this.description = description
    this.mission = mission
    this.services = []
  }

  static fromObject(obj) {
    const o = new Organization(obj.name, obj.initials, obj.description, obj.mission)
    o.id = obj.id
    o.services = obj.services ?? []
    return o
  }
}
