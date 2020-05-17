var mongoose= require("mongoose");
const Schema = mongoose.Schema;
var ObjectID = require('mongodb').ObjectID;
var notification = mongoose.model("notifications",{
    text:{
        type:String,
        required:true,
        trim:true,
    },
    sent:{
        type:Boolean,
        default:false,
        required:true

    },
    sourceId:{    // the user who created this notification
        type:String,
        required:true
    },
    userType:{   //wether an artist or a user who created the notifiction
        type:String,
        required:true,
        enum:["user","artist"],

    },
    sentTo:[
        {
            type: String,
            required: false,
        }
    ]
})

module.exports={notification};