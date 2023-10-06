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
    },
    points: {
      type: Number,
      default: 0
    },
    meal: {
      type: {
        type: Schema.Types.ObjectId, 
        ref: 'Meal'}
    },
    rewards: [{type: Schema.Types.ObjectId, ref: 'Rewards'}]
  },
  {
    timestamps: true
  }
);

module.exports = model('User', userSchema)