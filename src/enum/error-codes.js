var KeyMirror = require('keymirror')

const AssetErrorCodes = KeyMirror({
  INTERNAL_SERVER_ERROR: null,
  EMAIL_REQUIRED: null,
  ADDRESS_REQUIRED: null,

  TELEPHONE_REQUIRED: null,
  TELEPHONE_INVALID: null,

  CITIZEN_ID_REQUIRED: null,
  CITIZEN_ID_INVALID: null,

  USER_ID_REQUIRED: null,
  USER_ID_INVALID: null,
  USER_NOT_FOUND: null,

  PRODUCT_ID_REQUIRED: null,
  PRODUCT_ID_INVALID: null,
  PRODUCT_NOT_EXISTS: null,
  PRODUCT_NAME_REQUIRED: null,
  PRODUCT_PRICE_REQUIRED: null,
  PRODUCT_UNIT_REQUIRED: null,
  PRODUCT_IMAGE_REQUIRED: null,
  PRODUCT_IMAGE_FORBIDEN: null,
  PRODUCT_URL_REQUIRED: null,
  PRODUCT_URL_FORBIDEN: null,

  USER_NOT_FOUND: null,
  PACK_ID_REQUIRED: null,
  PACK_ID_INVALID: null,
  PACK_ID_NOT_EXISTS: null,
  PACK_NAME_REQUIRED: null,

  LOCATION_ID_REQUIRED: null,
  LOCATION_ID_INVALID: null,
  LOCATION_NOT_EXISTS: null,

  PRODUCTCATEGORY_ID_INVALID: null,
  PRODUCTCATEGORY_ID_REQUIRED: null,
  
  RECEIPT_ID_INVALID: null,
  RECEIPT_ID_REQUIRED: null,

  RECEIPTDETAIL_ID_INVALID: null,

  PACKPRODUCT_IDS_INVALID: null,

  PERMISSION_ADMIN_INVALID: null,
  PERMISSION_MANAGER_INVALID: null,
  PERMISSION_USER_INVALID: null,
  TOKEN_VERIFY_FAILED: null,
})

module.exports = {AssetErrorCodes}
