var{mongoose}= require("./db/mongoose.js");  
var{User}= require("./models/users.js");   //users model
var{artist}= require("./models/Artists.js");  //artists model
var{followArtist}= require("./models/followArtist.js");  // follow artist model
var{playlist}= require("./models/playlists.js"); // playlists model
var{followPlaylist}= require("./models/followPlaylist.js"); // followplaylist model
var{album}= require("./models/album.js"); // playlists model
var{images}= require("./models/images.js"); // images model
///monica
var{track}=require("./models/track.js");//track model
var{playlistTracks}=require("./models/playlistTracks.js") //playlist_track model
const {ObjectID}=require('mongodb');
const Schema = mongoose.Schema;

//////////////////////

//IMAGES OBJECTS

var image1= new images ({
    url:"dbfdkj vddv",
    height:34,
    width:12,
});
image1.save();
//image2
var image2= new images ({
    url:"www.images/image/234",
    height:200,
    width:65,
});
image2.save();
//image2
var image3= new images ({
        url:"www.images/imag23e/23454",
        height:176,
        width:65,
    });
image3.save();










//CREATING NEW USER INSTANCES AND SAVING THEM
var user1= new User({
    email:"        ahmed.ayman16@yahoo.com      ",
    password:"1234",
    isActive:true,
    userName:"hamadaaa  ",
    gender:"M",
    birthDate:'1990-06-19',
});

//SAVING AND RETURNING ID OF THE NEW USER
user1.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});
///
var user2= new User({
    email:"mario123@gmail.com",
    password:"kok123",
    userName:"Mario1",
    gender:"F",
    birthDate:'1990-06-19',
});


user2.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});

/////////////////////////////////////////////////
//CREATING NEW PLAYLISTS
var playlist1 = new playlist({
    userId:user1._id,
    playlistName:"Dejavu",
    privacy:true,
    image:image2
});

playlist1.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});

///playlist2
var playlist2 = new playlist({
    userId:user1._id,
    playlistName:"Likes",
    privacy:true,
    image:image3
    
});

playlist2.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});

///playlist3
var playlist3 = new playlist({
    userId:user1._id,
    playlistName:"X",
    privacy:false,
    image:image1,
});

playlist3.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});

///playlist4
var playlist4 = new playlist({
    userId:user2._id,
    playlistName:"Likes",
    image:image3
    
});

playlist4.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});

///playlist5
var playlist5 = new playlist({
    userId:user2._id,
    playlistName:"RecyleBin",
    image:image1
    
});

playlist5.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});



// User 2 following 2 playlists from user1
var followPlaylist1= new followPlaylist({
    userId: user2._id,
    playlistInfo:[{
        playlistId:playlist1._id,
        playlistName:playlist1.playlistName
    },{
        playlistId:playlist3._id,
        playlistName:playlist3.playlistName
    }]
})

followPlaylist1.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});





var artist1= new artist({
    email:"adele@music.com",
    password:"2020",
    artistName:"Adele",
    about:`Adele Laurie Blue Adkins (born May 5, 1988) is a British singer-songwriter 
    who has sold millions of albums worldwide and won a total of 15 Grammys as well as an Oscar.
     Adele's first two albums, 19 and 21, earned her critical praise and a level of
      commercial success unsurpassed among her peers.`,
    genres:["pop","R&B"],
    rating:4
});

//SAVING AND RETURNING ID OF THE NEW ARTIST
artist1.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});


//CREATING A third ARTIST

var artist2= new artist({
    email:"beeka70@hotmail.com",
    password:"$2b$10$sqP.uu/YJzYg0vErxw24TeMe8eeUzPtWCrSST8gGn9wMxYNQxqGNS",
    artistName:"HAmo Beeka",
    about:`Adele Laurie Blue Adkins (born May 5, 1988) is a British singer-songwriter 
    who has sold millions of albums worldwide and won a total of 15 Grammys as well as an Oscar.
     Adele's first two albums, 19 and 21, earned her critical praise and a level of
      commercial success unsurpassed among her peers.`,
    genres:["sha3by","R&B"]
});

artist2.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});


//CREATING A THIRD ARTIST
var artist3= new artist({
    password:"5080",
    artistName:"Eminem",
    about:`Marshall Bruce Mathers III (born October 17, 1972), known professionally as Eminem
     (/ˌɛmɪˈnɛm/; often stylized as EMINƎM), is an American rapper, songwriter, record producer, 
     record executive and actor. He is one of the most successful musical artists of the 21st century.`,
    genres:["Trap","Jazz","pop","Rap"],
    rating:4.6
});

artist3.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});




var followArtist1= new followArtist({
    user_id: user1._id,
    followedArtistInfo:[{
        artistName: artist1.artistName,
        followDate: Date.now(),
        //rate:2,
    },
    {
        artistName: artist2.artistName,
        followDate: Date.now(),
        rate:5,
    }
]
});

//SAVING AND RETURNING ID OF THE FOLLOW REQUEST
followArtist1.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});


//////////////MONICA
var track1=new track({
    artistId:artist1._id,
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
        artistId:artist1._id,
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
            artistId:artist1._id,
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
                artistId:artist3._id,
                trackName:"When I'm Gone",
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
                    artistId:artist3._id,
                    trackName:"Godzilla",
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
    var id1=playlist1._id;  //should be cahnged according to the playlist ids for each one individually
    
    var playlist1Tracks= new playlistTracks({
    
        playlistId:id1,
       
        tracks: [track1._id,track2._id]
    
    
    });
    
    playlist1Tracks.save().then((res)=>{
        console.log(res._id);
    },(err)=>{
        console.log(err);
    });
     
    var id2=playlist2._id;  //should be cahnged according to the playlist ids for each one individually
    
    var playlist2Tracks=new playlistTracks({
    
        playlistId:id2,
       
        tracks: [track4._id,track3._id,track5._id]
    


   });
        
        playlist2Tracks.save().then((res)=>{
            console.log(res._id);
        },(err)=>{
            console.log(err);
        });
    
///////////Creating Albums//////////////////
    var album1 = new album({
        artistId:artist2._id,
        albumName:"25",
        tracks: [track1._id,track2._id]
            
    });

    album1.save().then((res)=>{
        console.log(res._id);
    },(err)=>{

        console.log(err);
    });






