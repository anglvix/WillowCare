export default class Doctor {
  // Campo privado: rating tem validação, por isso é privado
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
  }

  get rating() {
    return this.#rating
  }

  set rating(value) {
    if (value < 0 || value > 5) return
    this.#rating = value
  }

  // Converte objeto cru do servidor em instância, preservando o id
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
    return d
  }
}
