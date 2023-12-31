const { Schema, model } = require('mongoose');

const Menu = new Schema({
    menuType: {
        type: String,
        enum: ["Lunch", "Dinner"],
        required: true,
        trim: true
    },
    itemName: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    calories: {
        type: Number,
        required: true,
        default: 0
    },
    edit: {
        type: Boolean,
        required: true,
        default: false
    }
},
    {
        timestamps: true
    });

module.exports = model('Menu', Menu);