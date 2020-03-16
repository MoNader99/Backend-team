var mongoose= require("mongoose");
const Schema=mongoose.Schema;

const followPlaylistSchema = new Schema({
    playlistId:{
        type:String,
        required:true,
    },
    playlistName:{
        type:String
    }
});

var followPlaylist= mongoose.model("FollowPlaylists",{
    userId:{
        type:String,
        required :true,
        unique:true
    },
    playlistInfo:[followPlaylistSchema]
});
module.exports={followPlaylist};