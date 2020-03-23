var mongoose= require("mongoose");
var{images,ImagesSchema}= require("./images.js"); // images model

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
  duration:   //in ms
  { type:Number,  //not sure about the field type
    required:true,
    

  },

  image:{
    type:ImagesSchema,
    required:true
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
  }
});

module.exports={track}; 