var mongoose= require("mongoose");
const Schema=mongoose.Schema;
//schema for the playlists
const playlistInfo = new Schema ({            
    playlistId:{
        type:String,
        required:true,
    },
    playlistName:{
        type:String
    }
});

//the created playlists of the user
var myPlaylists = mongoose.model("My Playlists",{
    userId: {
        type:String
    },
    playlistsArray:[playlistInfo],    // array of playlist schema created above
    
//THE ARRAY SIZE DEFUALT NUMBER TO BE SET TO 1 AND AUTOCREATING THE LIKES PLAYLIST WHEN THE USER IS CONFIRMED ACTIVE
})
module.exports={myPlaylists};