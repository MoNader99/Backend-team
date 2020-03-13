
//this demo is for creating the tracks and playlistTracks collections with some data inserted into them

var{mongoose}= require("./db/mongoose.js");  
var{playlist}= require("./models/playlists.js"); // playlists model
var{track}=require("./models/track.js");//track model
var{playlistTracks}=require("./models/playlistTracks.js") //playlist_track model

const {ObjectID}=require('mongodb');

// //creating tracks to be added to the database

var track1=new track({

trackName:"Hello",
rating:10,
duration:360000,
url:"cccc"  // until we get real urls 
});
track1.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});


var track2=new track({

    trackName:"someone like you",
    rating:9,
    duration:285000,
    url:"nnnn"  // until we get real urls 
    });
    track2.save().then((res)=>{
        console.log(res._id);
    },(err)=>{
        console.log(err);
    });
    
    var track3=new track({

        trackName:"set fire to the rain",
        rating:8,
        duration:240000,
        url:"kkkk"  // until we get real urls 
        });

        track3.save().then((res)=>{
            console.log(res._id);
        },(err)=>{
            console.log(err);
        });
        
        var track4=new track({

            trackName:"cheap thrills",
            rating:10,
            duration:262000,
            url:"lll"  // until we get real urls 
            });
    
            track4.save().then((res)=>{
                console.log(res._id);
            },(err)=>{
                console.log(err);
            });

            var track5=new track({

                trackName:"Never Give Up",
                rating:9,
                duration:223000,
                url:"vvv"  // until we get real urls 
                });
        
                track5.save().then((res)=>{
                    console.log(res._id);
                },(err)=>{
                    console.log(err);
                });
    




//creating Playlist1Tracks
var id1="5e6b3aa8162e8f2a541060b0";  //should be cahnged according to the playlist ids for each one individually

var playlist1Tracks= new playlistTracks({

playlist:{

    playlistId:"5e6b3aa8162e8f2a541060b0",

    playlistName:'Dejavu'

},
tracks:[{
    trackId:track1._id,
    trackName:track1.trackName,
    // rating:track1.rating,
    // duration:track1.duration,
    // url:track1.url  

},
{
    trackId:track2._id,
    trackName:track2.trackName,
    // rating:track2.rating,
    // duration:track2.duration,
    // url:track2.url  
}]


});

playlist1Tracks.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});
 
var id2='5e6b3aa8162e8f2a541060b2';  //should be cahnged according to the playlist ids for each one individually

var playlist2Tracks=new playlistTracks({

    playlist:{
    
        playlistId: "5e6b3aa8162e8f2a541060b2",
    
        playlistName:'Likes'
    
    },
    tracks:[{
        trackId:track4._id,
        trackName:track4.trackName,
    // rating:track4.rating,
    // duration:track4.duration,
    // url:track1.url  

    },
    {
        trackId:track3._id,
        trackName:track3.trackName,
    // rating:track3.rating,
    // duration:track3.duration,
    // url:track3.url  

    },
    {
        trackId:track5._id,
        trackName:track5.trackName,
    // rating:track5.rating,
    // duration:track5.duration,
    // url:track5.url  

    }

]    });
    
    playlist2Tracks.save().then((res)=>{
        console.log(res._id);
    },(err)=>{
        console.log(err);
    });
    

















