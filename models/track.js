var mongoose= require("mongoose");
const Schema=mongoose.Schema;
/////
var tracksSchema=new mongoose.Schema({
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
  numberOfTimesPlayed:{
    type:Number,
    default:0
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

var track = mongoose.model('Tracks',tracksSchema);
module.exports={track,tracksSchema}; 
