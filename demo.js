require('./Config/Config');
var fs = require('fs');
var { mongoose } = require("./db/mongoose.js");  
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



//IMAGES OBJECTS

var imgPath1 = "./Pictures/default.png";
var image1 = new images;
    image1.data = fs.readFileSync(imgPath1);
    image1.contentType = 'image/png';
    image1.save(function (err, a) {
      if (err) throw err;
      console.error('saved img to mongo');
    });

var imgPath2 = "./Pictures/Billie-Eilish.png";    
var image2 = new images;
    image2.data = fs.readFileSync(imgPath2);
    image2.contentType = 'image/png';
    image2.save(function (err, a) {
      if (err) throw err;
      console.error('saved img to mongo');
    });    

var imgPath3 = "./Pictures/Adele.png";    
var image3 = new images;
        image3.data = fs.readFileSync(imgPath3);
        image3.contentType = 'image/png';
        image3.save(function (err, a) {
          if (err) throw err;
          console.error('saved img to mongo');
        });        









//CREATING NEW USER INSTANCES AND SAVING THEM
var user1= new User({
    email:"        ahmed.ayman16@yahoo.com      ",
    password:"1234",
    isActive:true,
    userName:"hamadaaa  ",
    gender:"M",
    birthDate: '1990-06-19',
    image:image1
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
    birthDate: '1990-06-19',
    image:image2
});


user2.save().then((res)=>{
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
    rating: 4,
    image:image3
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
    genres: ["sha3by", "R&B"],
    image:image2
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
    rating: 4.6,
    image:image3
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
//////////////MONICA
var track1=new track({
    artistId:artist1._id,
    trackName:"Hello",
    rating:10,
    duration:360000,
    genre:"pop",
    image:image1,
    url:"uuu"  // until we get real urls 
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
        duration:360000,
        genre:"pop",
        image:image1,
        url:"qqq"  // until we get real urls 
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
            genre:"pop",
            image:image1,
            url:"nnnn"  // until we get real urls 
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
                genre:"rap",
                image:image1,
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
                    image:image1,
                    genre:"rap",
                    url:"vvv"  // until we get real urls 
                    });
            
                    track5.save().then((res)=>{
                        console.log(res._id);
                    },(err)=>{
                        console.log(err);
                    });
        
    
    
    
    
    
    
    
    
///////////Creating Albums//////////////////
    var album1 = new album({
        artistId:artist2._id,
        albumName:"25",
        tracks: [track1, track2],
        image:image1
            
    });

    album1.save().then((res)=>{
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
    tracks:[track1,track2],
    image:image1
});

playlist1.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});

///playlist2
var playlist2 = new playlist({
    userId:user1._id,
    playlistName:"Classics",
    privacy:true,
    tracks:[track1,track2,track3,track4],
    image:image1
    
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
    tracks:[track1,track2,track3,track4,track5],
    //This playlist will have the deafult image of the playlist
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
    image:image1,
    tracks:[track5]
    
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




