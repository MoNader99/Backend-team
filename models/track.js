var mongoose= require("mongoose");
/////
var track=mongoose.model("Tracks",{
    artistId:{     //the artist who sang this track
      type:String,
      required:true
    },
    trackName:{        
    type:String,
    required:true,
    trim:true,
    minlength:1
  },
  likes:{
    type:Number,
    default:0,
    required:true,
    min:0,
  },

  imagePath:{
    type:String,
    required:true,
    default:"default.jpeg",
    },
    
  type:{    //wether the track is single or in an album
    type:String,
    trim:true,
    minlength:5,
    required:true,
    default:"Single"

  },
  trackPath:
  { type:String,
    trim:true,
  },
  genre:{
    type:String,
    required:true,
    trim:true
  },
});

module.exports={track}; 