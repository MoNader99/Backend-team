var mongoose= require("mongoose");
var playlist=mongoose.model("Playlists",{
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
  }

});

module.exports={playlist};