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
  rating:{
      type:Number,
      default:null,
      required:false,
      min:1,
      max:10,

  },
  likes:{
    type:Number,
    default:0,
    required:true,
    min:0,
  },
  duration:   //in ms
  { type:Number,  //not sure about the field type
    required:true,
    

  },

  imagePath:{
    type:String,
    required:true,
    default:"./Pictures/default.png",
    },



  url:
  { type:String,
    unique: true,
    trim:true,
    required:true
  },
  genre:{
    type:String,
    required:true,
    trim:true
  },
});

module.exports={track}; 