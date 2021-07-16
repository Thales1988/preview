import mongoose from 'mongoose';
const { Schema } = mongoose;

import { hash, verify } from '../helpers/crypto.js'

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  cpf: {
    type: String,
    required: true,
    index: true,
    unique: true,
    sparse: true
  },
  roles: {
    type: Array,
    of: String,
    default: ['default']
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: true
  }
})

userSchema.pre('save', function (next) {
  this.password = hash(this.password)
  next()
})

userSchema.statics.verifyUser = async function (email, password) {
  let user = await this.findOne({ email }).select('+password')

  if (verify(password, user.password)) {
    return user
  }
  return null
}

export default mongoose.model('users', userSchema)
