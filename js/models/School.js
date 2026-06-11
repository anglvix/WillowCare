export default class School {
  constructor(name, location, district, description, type = 'public') {
    this.id = crypto.randomUUID()
    this.name = name
    this.location = location
    this.district = district
    this.description = description
    this.type = type
    this.supportFeatures = []
    this.contactPhone = ''
    this.contactEmail = ''
    this.address = ''
  }

  hasFeature(feature) {
    return this.supportFeatures.includes(feature)
  }

  get contact() {
    const parts = []
    if (this.contactPhone) parts.push(this.contactPhone)
    if (this.contactEmail) parts.push(this.contactEmail)
    return parts.join(' | ')
  }

  static fromObject(obj) {
    const s = new School(obj.name, obj.location, obj.district, obj.description, obj.type)
    s.id = obj.id
    s.supportFeatures = obj.supportFeatures ?? []
    s.contactPhone = obj.contactPhone ?? ''
    s.contactEmail = obj.contactEmail ?? ''
    s.address = obj.address ?? ''
    return s
  }
}
