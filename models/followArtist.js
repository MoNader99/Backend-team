var mongoose= require("mongoose");
const Schema=mongoose.Schema;

//Schema for the followed artist information attribute in the followArtist Collection
//
const followInfoSchema = new Schema({
    artistId: {
        type: String,
        required: true,
    },
    artistName:{
      type:String,
      required:true,
    },

    followDate:{
        type:Date,
        required:true,
    },
    
    rate:{
        type:Number,
        default:-1,   // if the user does not want to rate the artist  
        min:-1,  //The user actually cannot rate with negative the least he can rate with is 0 //To be controlled from front end 
        max:5,
    }
});


// FOLLOW RELATION BETWEEN ARTIST AND USER
var followArtist=mongoose.model('FollowArtist',{
    user_id:{
        type:String,
        reqiured:true,
        unique:true,
    },
    followedArtistInfo :[followInfoSchema]  // array of the followInfoSchema

})
module.exports={followArtist};
//module.exports={followSchema};  // MEEH