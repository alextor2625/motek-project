const { Schema, model } = require('mongoose');

const Rewards = new Schema(
    {
        rewardName: {
            type: String,
            trim: true,
            required: true
        },
        rewardType: {
            type: String,
            trim: true,
            required: true,
            enum:['Coupon','Voucher','Event']
        },
        rewardDescription: {
            type: String,
            trim: true
        },
        points: {
            type: Number,
            default:0
        }
    }, 
    {
        timestamps: true
    }
)

module.exports = model('Rewards', Rewards)