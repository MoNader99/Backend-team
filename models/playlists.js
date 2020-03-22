var mongoose= require("mongoose");
var{images,ImagesSchema}= require("./images.js"); // images model
const defaultModule=require("./../defaultimage");

var playlist=mongoose.model("Playlists",{

  userId:{   //to whom the playlist belongs to 
    type:String,
    required:true,   // the user id will not be unique here as his id can be assigned with more than 1 playlist

  },
  playlistName:{        //playlist name is not unique(logically) so it has be identified by the _id attribute
    type:String,
    required:true,
    trim:true,
    minlength:1
  },
  privacy:{
      type:Boolean,
      default:false,
  },
  href:{           //TO BE DETERMINED LATER
      type:String,
      unique:true
  },
  image:{
    type:ImagesSchema,
    required:true,
    default:defaultModule.defaultImage._doc
    },

    tracks: [
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: "track"
      }
  ]



});

module.exports={playlist};
