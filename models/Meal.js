const { Schema, model } = require('mongoose');

const mealSchema = new Schema(
    {
        menuItems: [{type: Schema.Types.ObjectId, ref: 'Menu'}],
        date: {
            type: Date,
            default: Date.now
        },
        calories: {
            type: Number,
        },
        description: {
            type: String,
            trim: true
        },
        points: {
            type: Number
        }
    }, 
    {
        timestamps: true
    }
)

module.exports = model('Meal', mealSchema)