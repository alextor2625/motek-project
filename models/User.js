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


// // models/User.model.js
// const { Schema, model } = require('mongoose');

// const userSchema = new Schema(
//   {
//     username: {
//       type: String,
//       trim: true,
//       required: [true, 'Username is required.'],
//       unique: true
//     },
//     email: {
//       type: String,
//       required: [true, 'Email is required.'],
//       unique: true,
//       lowercase: true,
//       trim: true,
//       match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
//     },
//     password: {
//       type: String,
//       required: [true, 'Password is required.']
//     }
//   },
//   {
//     timestamps: true
//   }
// );

// module.exports = model('User', userSchema);
