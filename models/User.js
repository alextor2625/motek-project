const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      trim: true
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: /^\S+@\S+\.\S+$/
    },
    password: {
      type: String,
      required: true
    },
    admin: {
      type: Boolean,
      enum: [true, false],
      required: true,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('User', userSchema)