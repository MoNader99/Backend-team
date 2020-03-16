var mongoose= require("mongoose");
const Schema=mongoose.Schema;

// const playlistInfo = new Schema ({            
//     playlistId:{
//         type:String,
//         required:true,
//     },
//     playlistName:{
//         type:String
//     }
// });

// const trackInfo= new Schema({
// trackId:{
//     type:String,
//     required:true
// },
// trackName:{
//     type:String,
//     required:true,
//     trim:true,
//     minlength:1
// }


// })



// var playlistTracks=mongoose.model("PlaylistTracks",
// {




// playlist:playlistInfo,
// tracks:[trackInfo],

// })

var playlistTracks=mongoose.model("PlaylistTracks",
{

    playlistId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Playlists"
    },
    tracks: [
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tracks"
      }
    ]



})




module.exports={playlistTracks};
