var KeyMirror = require('keymirror')

const WalletStatus = KeyMirror({
  NOT_CONNECTED: null,
  CONNECTED: null,
  LOCK: null,
})

export {WalletStatus}
