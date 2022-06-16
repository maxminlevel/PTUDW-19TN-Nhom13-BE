async function applyExtraSetup(ctx) {
  const {sequelize} = ctx

  // console.log(models)
  const {
    Configuration,
    CureHistory,
    ActionHistory,
    Location,
    PackProduct,
    Pack,
    Patient,
    PatientRelate,
    Product,
    ProductCategory,
    Receipt,
    ReceiptDetail,
    User,
    Wallet,
  } = sequelize.models

  ProductCategory.hasMany(Product)
  Product.belongsTo(ProductCategory)

  Product.belongsToMany(Pack, {through: 'PackProduct'})
  Pack.belongsToMany(Product, {through: 'PackProduct'})

  Pack.belongsTo(ReceiptDetail)
  ReceiptDetail.hasOne(Pack)
  Product.belongsTo(ReceiptDetail)
  ReceiptDetail.hasOne(Product)

  ReceiptDetail.belongsTo(Receipt)
  Receipt.hasMany(ReceiptDetail)

  Receipt.belongsTo(User)
  User.hasMany(Receipt)

  Wallet.belongsTo(User)
  User.hasMany(Wallet)

  ActionHistory.belongsTo(User)
  User.hasMany(ActionHistory)

  User.belongsTo(Patient)
  Patient.hasOne(User)

  Patient.belongsToMany(Patient, {
    through: PatientRelate,
    as: 'Source',
    foreignKey: 'SourceId',
  })
  Patient.belongsToMany(Patient, {
    through: PatientRelate,
    as: 'Target',
    foreignKey: 'TargetId',
  })

  Patient.belongsTo(CureHistory)
  CureHistory.hasMany(Patient)

  Location.belongsTo(CureHistory)
  CureHistory.hasOne(Location)
}

module.exports = {applyExtraSetup}
