const { Schema, model } = require('mongoose');

const Rewards = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true
        },
        description: {
            type: String,
            trim: true
        },
        points: {
            type: Number,
            required: true,
            default:0
        }
    }, 
    {
        timestamps: true
    }
)

module.exports = model('Rewards', Rewards)