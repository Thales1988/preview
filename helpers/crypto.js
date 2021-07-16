import crypto from 'crypto'

function hash(password) {
  const salt = crypto.randomBytes(8).toString('hex')
  const passwordHashed = crypto.scryptSync(password, salt, 64)

  return `${salt}:${passwordHashed.toString('hex')}`
}

function verify(passwordSended, hash) {
  let [salt, passwordHashed] = hash.split(':')

  const passwordBuffer = Buffer.from(passwordHashed, 'hex')

  const passwordSendedHashed = crypto.scryptSync(passwordSended, salt, 64)

  return crypto.timingSafeEqual(passwordSendedHashed, passwordBuffer)
}

export { hash, verify }
