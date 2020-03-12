var{mongoose}= require("./db/mongoose.js");  
var{user}= require("./models/users.js");   //users model
var{artist}= require("./models/Artists.js");  //artists model
var{followArtist}= require("./models/followArtist.js");  // follow artist model
var{playlist}= require("./models/playlists.js"); // playlists model
var{followPlaylist}= require("./models/followPlaylist.js"); // followplaylist model
var{myPlaylists}= require("./models/myPlaylists.js"); // createplaylist model

///////////////////////


//CREATING NEW USER INSTANCES AND SAVING THEM
var user1= new user({
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
var user2= new user({
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
//CREATING A NEW PLAYLIST
var playlist1 = new playlist({
    playlistName:"RecycleBin"
});

playlist1.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});

var playlist2= new playlist({
    playlistName:"Dejavu",
    privacy:true
});

playlist2.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});


var playlist3= new playlist({
    playlistName:"X",
    privacy:false
});

playlist3.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});


var playlist4= new playlist({
    playlistName:"Likes",
    privacy:false
});

playlist4.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});


//LINKING THE USER WITH HIS CREATED PLAYLIST
var myPlaylist1= new myPlaylists({
    userId : user1._id,
    playlistsArray : [{
        playlistId : playlist3._id,
        playlistName : playlist3.playlistName
    },{
        playlistId : playlist4._id,
        playlistName : playlist4.playlistName
    }]
 
});
myPlaylist1.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});



// MY USER FOLLOWING THE 2 PLAYLISTS I CREATED
var followPlaylist1= new followPlaylist({
    userId: user1._id,
    playlistInfo:[{
        playlistId:playlist1._id,
        playlistName:playlist2.playlistName
    },{
        playlistId:playlist2._id,
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
    genres:["pop","R&B"]
});

//SAVING AND RETURNING ID OF THE NEW ARTIST
artist1.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});


//CREATING A SECOND ARTIST

var artist2= new artist({
    email:"beeka70@hotmail",
    password:"2032",
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







