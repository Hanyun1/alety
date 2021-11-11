const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const user = new  mongoose.Schema({

    username:{
        type: String,
        required: true,
        unique: true
    },
    
    fullname:{
        type: String,
        default:"user"
    },

    birthday:{
        type: Date, 
        default: null
    },

    emailAddress:{
        type: String,
        required: true,
        unique: true
    },

    phoneNumber: {
        type: String,
        default: null,
    },

    address: {
        type: String,
        default: null,
    },

    gender: {
        type: String,
        enum : ['man','woman','other',null],
        default: null,
    },

    age: {
        type: Number,
        min: 0,
        max: 180,
        default: null,
    },


    description: {
        type: String,
        maxlength: 1000,
        default: null,
    },

    password:{
        type: String,
        required: true
    },

    contacts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'contacts'
    }],

    inserDate:{
        type: Date, 
        default: Date.now
    },

    events:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:'events'
    }],
})

user.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
module.exports = mongoose.model("users", user)