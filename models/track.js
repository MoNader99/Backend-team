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
    default: 120000 //assuming 2 mins (2*60*10^3) 

  },

  image:{
    type:ImagesSchema,
    //TO BE SET TO REQUIRED AND HAVE A DEFAULT HAVE OF ANY IMAGE IN THE IMAGES COLLECTION
    },



  url:
  { type:String,
    unique: true ,
    trim:true
  }
});

module.exports={track}; 