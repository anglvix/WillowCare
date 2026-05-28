export default class School {
  constructor(name, location, district, description, type = 'public') {
    this.id = crypto.randomUUID()
    this.name = name
    this.location = location
    this.district = district
    this.description = description
    this.type = type
    this.supportFeatures = []
  }

  hasFeature(feature) {
    return this.supportFeatures.includes(feature)
  }

  static fromObject(obj) {
    const s = new School(obj.name, obj.location, obj.district, obj.description, obj.type)
    s.id = obj.id
    s.supportFeatures = obj.supportFeatures ?? []
    return s
  }
}
