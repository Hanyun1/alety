const mongoose = require('mongoose')
var Schema = mongoose.Schema


const ContactTemplate = new Schema({

    star:{
        type: Boolean, 
        default: false
    },

    uid:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'users',
        required: true
    },

    fullname:{
        type: String, 
        required: true
    },

    emailAddress:{
        type: String,
        required: true
    },

    phoneNumber:{
        type: String,
        default: null
    },

    address:{
        type:String,
        default: null
    },
    
    gender:{
        type: String,
        enum : ['man','woman','other',null],
        default: null
    },

    age:{
        type: Number,
        min: 0,
        max: 180,
        default: null
    },

    description:{
        type: String,
        maxlength: 1000,
        default: null
    },

    birthday:{
        type: Date, 
        default: null
    },
    
    insertDate:{
        type: Date, 
        default: Date.now
    },

})

module.exports = mongoose.model("contacts", ContactTemplate)