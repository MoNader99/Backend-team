require('./Config/Config');
var fs = require('fs');
var { mongoose } = require("./db/mongoose.js");
var{User}= require("./models/users.js");   //users model
var{artist}= require("./models/artists.js");  //artists model
var{followArtist}= require("./models/followArtist.js");  // follow artist model
var{playlist}= require("./models/playlists.js"); // playlists model
var { followPlaylist } = require("./models/followPlaylist.js"); // followplaylist model
var { followUser } = require("./models/followUser.js"); // followplaylist model
var{album}= require("./models/album.js"); // albums model
var{track}=require("./models/track.js");//track model
var{notification}=require("./models/notifications.js");//notifications model
const {ObjectID}=require('mongodb');
const Schema = mongoose.Schema;



//PATH OF IMAGES
var imgPath1 = "default.jpeg";   //default picture of playlist
var imgPath2 = "Billie-Eilish.jpg";
var imgPath3 = "Adele.png";
var imgPath4 = "defaultuser.png";
var imgPath5 = "AmrDiab1.jpg";
var imgPath6 = "eminem.jpg";
var imgPath7 = "When_I'm_Gone_(Eminem_song).jpg";
var imgPath8 = "LoseYourselfPicEminem.jpg";
var imgPath9 = "AmrDiabAlbumTalat.jpg";
var imgPath11 = "kaleo.jpg";
var imgPath10 = "KaleoAlbum1.jpg";
var imgPath12 = "KaleoWayDownWeGo.jpg";


//ARTISTS
//////////////////////////////////////////////////////
var artist1= new artist({
    email:"adele@music.com",
    password:"$2b$10$tZ9A05CzdvX9AodV6Q/aZOt/8bIIJT78rN3Ax1txwfkY8MJujc4ZK",  //111
    artistName:"Adele",
    about:`Adele Laurie Blue Adkins (born May 5, 1988) is a British singer-songwriter
    who has sold millions of albums worldwide and won a total of 15 Grammys as well as an Oscar.
     Adele's first two albums, 19 and 21, earned her critical praise and a level of
      commercial success unsurpassed among her peers.`,
    genres:["pop","R&B"],
    rating: 4,
    imagePath:imgPath3,
    gender:"F",
    birthDate:"1988-05-05"
});

//SAVING AND RETURNING ID OF THE NEW ARTIST
artist1.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});


//CREATING A second ARTIST

var artist2= new artist({
    
    email:"be12@hotmail.com",
    password:"$2b$10$sqP.uu/YJzYg0vErxw24TeMe8eeUzPtWCrSST8gGn9wMxYNQxqGNS",
    artistName:"Billie Eilish",
    about:`Billie Eilish is an American singer-songwriter who first shot to prominence when she uploaded her breakout hit
    "Ocean Eyes" to SoundCloud in 2015. ... She worked with her brother, Finneas O'Connell, to record "Ocean Eyes,"
     a song O'Connell had initially written for his band`,
    genres: ["sha3by", "R&B"],
    imagePath:imgPath2,
    gender:"M",
    birthDate:"2001-12-18"
});

artist2.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});


var artist3= new artist({

    artistName:"Eminem",
    about:`Marshall Bruce Mathers III (born October 17, 1972), known professionally as Eminem
     (/ˌɛmɪˈnɛm/; often stylized as EMINƎM), is an American rapper, songwriter, record producer,
     record executive and actor. He is one of the most successful musical artists of the 21st century.`,
    genres:["Trap","Jazz","pop","Rap"],
    imagePath:imgPath6,
    rating: 4.6,
    gender:"M",
    birthDate:"1988-05-05"
});

artist3.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});



var artist4= new artist({
    email:"amrdiab@abc.com",
    password:"$2b$10$tZ9A05CzdvX9AodV6Q/aZOt/8bIIJT78rN3Ax1txwfkY8MJujc4ZK",  //111
    artistName:"Amr Diab",
    about:`Amr Diabis an Egyptian singer, composer and former actor. He has established himself as an acclaimed recording artist and author in most Mediterranean countries. According to a research by Michael Frishkopf, he has created his style termed as "Mediterranean Music", a blend of Western and Egyptian rhythms. By 1992, he became the first Egyptian and Middle Eastern artist to start making high-tech music videos.`,
    genres:["pop","R&B"],
    rating: 4,
    imagePath:imgPath5,
    gender:"M",
    birthDate:"1988-05-05"
});


artist4.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});


var artist5= new artist({
    email:"kaleo@abc.com",
    password:"$2b$10$tZ9A05CzdvX9AodV6Q/aZOt/8bIIJT78rN3Ax1txwfkY8MJujc4ZK",  //111
    artistName:"Kaleo",
    about:`Kaleo (stylized as KALEO) is an Icelandic rock band that formed at Mosfellsbær in 2012, consisting of lead vocalist and guitarist JJ Julius Son, drummer David Antonsson, bassist Daniel Kristjansson, and lead guitarist Rubin Pollock. ... Lead singles "I Want More" and "Break My Baby" were released on 15 January 2020.`,
    genres:["Alternative Rock","Garage punk","Blues"],
    rating: 10,
    imagePath:imgPath11,
    gender:"M",
    birthDate:"1990-12-12"
});
artist5.save();

//TRACKS
///////////////////////////////////////////////
var track1=new track({
    artistId:artist1._id,
    trackName:"Hello",
    imagePath:imgPath1,
    likes:9,
    genre:"Jazz",
    trackPath:"Hello-Adele-seeds.mp3" 
    });
track1.save();
    
var track2=new track({
    artistId:artist3._id,
    trackName:"Lose Yourself",
    imagePath:imgPath8,
    likes:7,
    genre:"Rap",
    trackPath:"Lose Yourself-Eminem-seeds.mp3"  
    });    
    
track2.save();

var track3=new track({
    artistId:artist4._id,
    trackName:"Tamaly m3ak",
    imagePath:imgPath1,
    type:"Album",
    likes:10,
    genre:"Arabic",
    trackPath:"Tamaly m3ak-Amr Diab-seeds.mp3"  
    });    
    
track3.save();

var track5=new track({
    artistId:artist4._id,
    trackName:"Youm Talat",
    imagePath:imgPath1,
    type:"Album",
    likes:20,
    genre:"Arabic",
    trackPath:"Youm Talat-Amr Diab-seeds.mp3"  
    });    
track5.save();

var track4=new track({
    artistId:artist3._id,
    trackName:"When I'm Gone",
    imagePath:imgPath7,
    likes:10,
    genre:"Rap",
    trackPath:"When I'm Gone-Eminem-seeds.mp3"  
    });    
    
track4.save();

var track6=new track({
    artistId:artist5._id,
    trackName:"Way Down We Go",
    imagePath:imgPath12,
    likes:10,
    genre:"Alternative Rock",
    trackPath:"Way Down We Go.Kaleowith Lyrics ..mp3"  
    });    
    
track6.save();

var track7=new track({
    artistId:artist5._id,
    trackName:"Broken Bones",
    imagePath:imgPath10,
    likes:20,
    type:"Album",
    genre:"Blues",
    trackPath:"KALEO Broken Bones [Official Audio].mp3"  
    });   
track7.save();

var track8=new track({
    artistId:artist5._id,
    trackName:"I Can't Go On Without You",
    imagePath:imgPath10,
    likes:50,
    type:"Album",
    genre:"Blues",
    trackPath:"KALEO I Can't Go On Without You [Official Audio].mp3"  
    });   
track8.save();

var track9=new track({
    artistId:artist5._id,
    trackName:"Hot Blood",
    imagePath:imgPath10,
    likes:21,
    type:"Album",
    genre:"Alternative Rock",
    trackPath:"KALEO Hot Blood [Official Audio].mp3"  
    });   
track9.save();
///////////Creating Albums//////////////////
var album1 = new album({
    artistId:artist4._id,
    albumName:"El Leila",
    imagePath:imgPath9,
    tracks: [track3, track5],
});

album1.save();

var album2 = new album({
    artistId:artist5._id,
    albumName:"A/B",
    imagePath:imgPath10,
    tracks: [track7, track8,track9],
});

album2.save();

//USERS
////////////////////////////////////////////////
//CREATING NEW USER INSTANCES AND SAVING THEM
var user1= new User({
    email:"        ayaelsackaan.1999@gmail.com      ",
    password:"$2b$10$tZ9A05CzdvX9AodV6Q/aZOt/8bIIJT78rN3Ax1txwfkY8MJujc4ZK",  //111
    isActive:true,
    userName:"hamadaaa  ",
    gender:"M",
    birthDate: '1990-06-19',

});

//SAVING AND RETURNING ID OF THE NEW USER
user1.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});
//
var user2= new User({
    email:"mario123@gmail.com",
    password:"$2b$10$tZ9A05CzdvX9AodV6Q/aZOt/8bIIJT78rN3Ax1txwfkY8MJujc4ZK",  //111
    userName:"Mario1",
    gender:"F",
    birthDate: '1990-06-19',

});


user2.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});
var user3 = new User({
    email: "ayamahmoud99@gmail.com",
    password: "$2b$10$tZ9A05CzdvX9AodV6Q/aZOt/8bIIJT78rN3Ax1txwfkY8MJujc4ZK",  //111
    userName: "Aya",
    gender: "F",
    birthDate: '1999-09-09',

});


user3.save().then((res) => {
    console.log(res._id);
}, (err) => {
    console.log(err);
});

var followArtist1= new followArtist({
    user_id: user1._id,
    followedArtistInfo: [{
        artistId: artist1._id.toString(),
        artistName: artist1.artistName,
        followDate: Date.now(),
        //rate:2,
    },
    {
        artistId: artist2._id.toString(),
        artistName: artist2.artistName,
        followDate: Date.now(),
        rate:5,
    }
]
});
var followUser1 = new followUser({
    user_id: user1._id,
    followedUserInfo: [{
        userId: user2._id.toString(),
        followDate: Date.now(),
        //rate:2,
    },
    {
        userId: user3._id.toString(),
        followDate: Date.now(),
        rate: 5,
    }
    ]
});



//SAVING AND RETURNING ID OF THE FOLLOW REQUEST
followArtist1.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});

followUser1.save().then((res) => {
    console.log(res._id);
}, (err) => {
    console.log(err);
})




/////////////////////////////////////////////////
//CREATING NEW PLAYLISTS
var playlist1 = new playlist({
    userId:user1._id,
    playlistName:"Dejavu",
    privacy:true,
    tracks:[track1,track2,track3,track4,track5],
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
    tracks: [track1, track2, track3, track4, track5],
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
    playlistName:"90's",

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
    tracks: [track4,track1,track5],
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
        playlistId:playlist2._id,
        playlistName:playlist3.playlistName
    }]
})

followPlaylist1.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});



//NOTIFICATION SEEDS
var not1 = new notification({
    text:"Eminem released a new Song (Lose Ypurself)",
    sent:true,
    sourceId:artist3._id,
    userType:"artist"
    
});
not1.save();

var not2 = new notification({
    text:"Amr Diab released a new album",
    sent:true,
    sourceId:artist4._id,
    userType:"artist"
    
});
not2.save();

