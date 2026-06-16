export default class Doctor {
  #rating

  constructor(name, specialty, bio, region, yearsExperience, rating = 0) {
    this.id = crypto.randomUUID()
    this.name = name
    this.specialty = specialty
    this.bio = bio
    this.region = region
    this.yearsExperience = yearsExperience
    this.#rating = rating
    this.highlights = []
    this.photo = ''
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

  get rating() {
    return this.#rating
  }

  set rating(value) {
    if (value < 0 || value > 5) return
    this.#rating = value
  }

  static fromObject(obj) {
    const d = new Doctor(
      obj.name,
      obj.specialty,
      obj.bio,
      obj.region,
      obj.yearsExperience,
      obj.rating
    )
    d.id = obj.id
    d.highlights = obj.highlights ?? []
    d.photo = obj.photo ?? ''
    d.contactPhone = obj.contactPhone ?? ''
    d.contactEmail = obj.contactEmail ?? ''
    d.address = obj.address ?? ''
    return d
  }
}
