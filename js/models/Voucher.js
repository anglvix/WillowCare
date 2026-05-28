export default class Voucher {
  constructor(userId, activityId, activityType, activityTitle, date, location) {
    this.id = crypto.randomUUID()
    this.userId = userId
    this.activityId = activityId
    this.activityType = activityType  // 'workshop' | 'excursion'
    this.activityTitle = activityTitle
    this.date = date
    this.location = location
    this.code = Voucher.generateCode()
    this.status = 'active'
  }

  // Não criptograficamente seguro, mas para fins de demonstração é suficiente
  static generateCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let code = 'WLC-'
    for (let i = 0; i < 6; i++) {
      code += chars[Math.floor(Math.random() * chars.length)]
    }
    return code
  }

  static fromObject(obj) {
    const v = new Voucher(
      obj.userId, obj.activityId, obj.activityType,
      obj.activityTitle, obj.date, obj.location
    )
    v.id = obj.id
    v.code = obj.code
    v.status = obj.status
    return v
  }
}
