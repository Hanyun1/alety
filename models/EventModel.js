const mongoose = require('mongoose')

const eventTemplate = new  mongoose.Schema({
    eventname:{
        type: String,
        required: true
    },
    
    Address:{
        type: String,
        required: true
    },
    
    remainder:{
        type: String,
    },
    eventTime:{
        type: Date,
        requeired:true
    },
    star:{
        type: Boolean,
        default:false
    },
    peoplewith:{
        type: String,// this one will connect to friend model later
    }
})

module.exports = mongoose.model("events", eventTemplate)