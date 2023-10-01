const { Schema, model } = require('mongoose');

const Menu = new Schema({
    menuType: {
        type: String,
        enum:['Lunch','Dinner'],
        required: true,
        trim: true
    },
    itemName:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    category:{
        type: String,
        required: true,
        trim: true,
    },
    calories:{
        type: Number,
    }
},
{
  timestamps: true
});

module.exports = model('Menu', Menu);