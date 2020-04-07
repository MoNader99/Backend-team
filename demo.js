require('./Config/Config');
var fs = require('fs');
var { mongoose } = require("./db/mongoose.js");
var{User}= require("./models/users.js");   //users model
var{artist}= require("./models/artists.js");  //artists model
var{followArtist}= require("./models/followArtist.js");  // follow artist model
var{playlist}= require("./models/playlists.js"); // playlists model
var{followPlaylist}= require("./models/followPlaylist.js"); // followplaylist model
var{album}= require("./models/album.js"); // playlists model
var{track}=require("./models/track.js");//track model
const {ObjectID}=require('mongodb');
const Schema = mongoose.Schema;



//PATH OF IMAGES

var imgPath1 = "default.png";   //default picture of playlist
var imgPath2 = "Billie-Eilish.png";
var imgPath3 = "Adele.png";
var imgPath4 = "defaultuser.png";
var imgPath5 = "AmrDiab.png";
var imgPath6 = "eminem.png";
var imgPath7 = "sia.png";
var imgPath8 = "miley.png";
var imgPath9 = "JenGr.png";
var imgPath10 = "ed.png";
var imgPath11 = "sel.png";
var imgPath12 = "coldplay.png";









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


//CREATING A THIRD ARTIST
var artist3= new artist({

    artistName:"Eminem",
    about:`Marshall Bruce Mathers III (born October 17, 1972), known professionally as Eminem
     (/ˌɛmɪˈnɛm/; often stylized as EMINƎM), is an American rapper, songwriter, record producer,
     record executive and actor. He is one of the most successful musical artists of the 21st century.`,
    genres:["Trap","Jazz","pop","Rap"],
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
    artistName:"AmrDiab",
    about:`Amr Diabis an Egyptian singer, composer and former actor. He has established himself as an acclaimed recording artist and author in most Mediterranean countries. According to a research by Michael Frishkopf, he has created his style termed as "Mediterranean Music", a blend of Western and Egyptian rhythms. By 1992, he became the first Egyptian and Middle Eastern artist to start making high-tech music videos.`,
    genres:["pop","R&B"],
    rating: 4,
    imagePath:imgPath5,
    gender:"M",
    birthDate:"1988-05-05"
});

//SAVING AND RETURNING ID OF THE NEW ARTIST
artist4.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});



var artist5= new artist({
    email:"sia@abc.com",
    password:"$2b$10$tZ9A05CzdvX9AodV6Q/aZOt/8bIIJT78rN3Ax1txwfkY8MJujc4ZK",  //111
    artistName:"Sia",
    about:" is an Australian singer, songwriter, voice actress and music video director. She started her career as a singer in the acid jazz band Crisp in the mid-1990s in Adelaide. In 1997, when Crisp disbanded, she released her debut studio album titled OnlySee in Australia. She moved to London, England, and provided lead vocals for the British duo Zero 7. In 2000, Sia released her second studio album, Healing Is Difficult, and her third studio album, Colour the Small One, in 2004, but all of these struggled to connect with a mainstream audience.",
    genres:["pop","R&B"],
    rating: 4,
    imagePath:imgPath5,
    gender:"F",
    birthDate:"1988-05-05"
});

//SAVING AND RETURNING ID OF THE NEW ARTIST
artist5.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});



var artist6= new artist({
    email:"miley@abc.com",
    password:"$2b$10$tZ9A05CzdvX9AodV6Q/aZOt/8bIIJT78rN3Ax1txwfkY8MJujc4ZK",  //111
    artistName:"Miley Cyrus",
    about:"is an American singer, songwriter, and actress. Her music has spanned a range of styles, including pop, country pop, and hip hop. Cyrus' personal life, public image, and performances have often sparked controversy and received widespread media coverage.",
    genres:["pop","R&B"],
    rating: 4,
    imagePath:imgPath5,
    gender:"F",
    birthDate:"1988-05-05"
});

//SAVING AND RETURNING ID OF THE NEW ARTIST
artist6.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});

var artist7= new artist({
    email:"jen@abc.com",
    password:"$2b$10$tZ9A05CzdvX9AodV6Q/aZOt/8bIIJT78rN3Ax1txwfkY8MJujc4ZK",  //111
    artistName:"Jennifer Grout",
    about:"Jennifer Grout was born in Mesa (Arizona, US) and studied in McGill University in Canada. She is the daughter of a pianist and a violinist and began studying music at 5. In 2012 and after her summer trip to Morocco, Jennifer Grout got interested in Arabic and Amazigh culture and music. She competed in Arabs Got Talent and was finalist in 2013",
    genres:["pop","R&B"],
    rating: 4,
    imagePath:imgPath5,
    gender:"F",
    birthDate:"1988-05-05"
});

//SAVING AND RETURNING ID OF THE NEW ARTIST
artist7.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});

var artist8= new artist({
    email:"edsh@abc.com",
    password:"$2b$10$tZ9A05CzdvX9AodV6Q/aZOt/8bIIJT78rN3Ax1txwfkY8MJujc4ZK",  //111
    artistName:"Ed Sheeran",
    about:"Ed Sheeran may be the quintessential pop star of the 2010s: a singer/songwriter who seems to acknowledge no boundaries between styles or eras, creating a sound that's idiosyncratic and personal. Sheeran borrows from any style that crosses his path -- elements of folk, hip-hop, pop, dance, soul, and rock can be heard in his big hits The A Team,Sing,Thinking Out Loud, and Shape of You -- which gives him a broad appeal among different demographics, helping to elevate him to international stardom not long after the release of his 2011 debut, +.",
    genres:["pop","R&B"],
    rating: 4,
    imagePath:imgPath5,
    gender:"M",
    birthDate:"1988-05-05"
});

//SAVING AND RETURNING ID OF THE NEW ARTIST
artist8.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});

var artist9= new artist({
    email:"Sel@abc.com",

password:"$2b$10$tZ9A05CzdvX9AodV6Q/aZOt/8bIIJT78rN3Ax1txwfkY8MJujc4ZK",  //111
    artistName:"Selena Gomez",
    about:"Selena Gomez is a multi-talented performer with featured roles on the screen, both small and big, and a musical career that reached the summit of the charts from the very beginning. Her group Selena Gomez & the Scene issued a trio of breezy modern pop albums from 2009 to 2011 that each reached the Top Ten. After going solo, she scored a pair of number ones with the more adult-oriented Stars Dance (2013) and Revival (2015), then branched out into new sounds on collaborations with Kygo (It Ain't Me) and Marshmello (Wolves). She hit the top of the singles chart for the first time with (Lose You to Love Me) (2019), a soul-searching ballad that delved into Gomez's real-life relationships and marked a new openness in her lyrical approach. The single's subsequent parent release, Rare (2020), became her third straight number one album.",
    genres:["pop","R&B"],
    rating: 4,
    imagePath:imgPath5,
    gender:"F",
    birthDate:"1988-05-05"
});

//SAVING AND RETURNING ID OF THE NEW ARTIST
artist9.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});


var artist10= new artist({
    email:"coldplay@abc.com",

password:"$2b$10$tZ9A05CzdvX9AodV6Q/aZOt/8bIIJT78rN3Ax1txwfkY8MJujc4ZK",  //111
    artistName:"Coldplay",
    about:"Coldplay came together as a band in late 1997 when Guy Berryman, Jonny Buckland, Will Champion and Chris Martin met at University College, London.  The band have gone on to become one of the planet’s most popular acts, selling more than 75 million copies of their seven Number One albums, which have spawned a string of classic hits including Yellow, Clocks, Fix You, Paradise, Viva La Vida and A Sky Full Of Stars. They’ve also filled their trophy cabinet with almost every major music award there is (including seven Grammys and nine BRITs). ",
    genres:["pop","R&B"],
    rating: 4,
    imagePath:imgPath5,
    gender:"M",
    birthDate:"1988-05-05"
});

//SAVING AND RETURNING ID OF THE NEW ARTIST
artist10.save().then((res)=>{
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


    });

    album1.save().then((res)=>{
        console.log(res._id);
    },(err)=>{

        console.log(err);
    });

//CREATING NEW USER INSTANCES AND SAVING THEM
var user1= new User({
    email:"        ayaelsackaan.1999@gmail.com      ",
    password:"$2b$10$tZ9A05CzdvX9AodV6Q/aZOt/8bIIJT78rN3Ax1txwfkY8MJujc4ZK",  //111
    isActive:true,
    userName:"hamadaaa  ",
    gender:"M",
    birthDate: '1990-06-19',
    likedTracks:[track1,track2,track4],
    likedAlbums:[album1],

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


var user3= new User({
    email:"user3@example.com",
    password:"$2b$10$tZ9A05CzdvX9AodV6Q/aZOt/8bIIJT78rN3Ax1txwfkY8MJujc4ZK",  //111
    isActive:true,
    userName:"john  ",
    gender:"M",
    birthDate: '1990-06-19',
    likedTracks:[track1,track2,track4],
    likedAlbums:[album1],

});

//SAVING AND RETURNING ID OF THE NEW USER
user3.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});




var user4= new User({
    email:"user4@example.com",
    password:"$2b$10$tZ9A05CzdvX9AodV6Q/aZOt/8bIIJT78rN3Ax1txwfkY8MJujc4ZK",  //111
    isActive:true,
    userName:"paul  ",
    gender:"M",
    birthDate: '1990-06-19',
    likedTracks:[track1,track2,track4],
    likedAlbums:[album1],

});

//SAVING AND RETURNING ID OF THE NEW USER
user4.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});



var user5= new User({
    email:"user5@example.com",
    password:"$2b$10$tZ9A05CzdvX9AodV6Q/aZOt/8bIIJT78rN3Ax1txwfkY8MJujc4ZK",  //111
    isActive:true,
    userName:"mark  ",
    gender:"M",
    birthDate: '1990-06-19',
    likedTracks:[track1,track2,track4],
    likedAlbums:[album1],

});

//SAVING AND RETURNING ID OF THE NEW USER
user5.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});



var user6= new User({
    email:"user6@example.com",
    password:"$2b$10$tZ9A05CzdvX9AodV6Q/aZOt/8bIIJT78rN3Ax1txwfkY8MJujc4ZK",  //111
    isActive:true,
    userName:"sandy",
    gender:"F",
    birthDate: '1990-06-19',
    likedTracks:[track1,track2,track4],
    likedAlbums:[album1],

});

//SAVING AND RETURNING ID OF THE NEW USER
user6.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});




var user7= new User({
    email:"user7@example.com",
    password:"$2b$10$tZ9A05CzdvX9AodV6Q/aZOt/8bIIJT78rN3Ax1txwfkY8MJujc4ZK",  //111
    isActive:true,
    userName:"noura  ",
    gender:"F",
    birthDate: '1990-06-19',
    likedTracks:[track1,track2,track4],
    likedAlbums:[album1],

});

//SAVING AND RETURNING ID OF THE NEW USER
user7.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});



var user8= new User({
    email:"user8@example.com",
    password:"$2b$10$tZ9A05CzdvX9AodV6Q/aZOt/8bIIJT78rN3Ax1txwfkY8MJujc4ZK",  //111
    isActive:true,
    userName:"mohamed",
    gender:"M",
    birthDate: '1990-06-19',
    likedTracks:[track1,track2,track4],
    likedAlbums:[album1],

});

//SAVING AND RETURNING ID OF THE NEW USER
user8.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});



var user9= new User({
    email:"user9@example.com",
    password:"$2b$10$tZ9A05CzdvX9AodV6Q/aZOt/8bIIJT78rN3Ax1txwfkY8MJujc4ZK",  //111
    isActive:true,
    userName:"ahmed ",
    gender:"M",
    birthDate: '1990-06-19',
    likedTracks:[track1,track2,track4],
    likedAlbums:[album1],

});

//SAVING AND RETURNING ID OF THE NEW USER
user9.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});




var user10= new User({
    email:"user10@example.com",
    password:"$2b$10$tZ9A05CzdvX9AodV6Q/aZOt/8bIIJT78rN3Ax1txwfkY8MJujc4ZK",  //111
    isActive:true,
    userName:"mona",
    gender:"F",
    birthDate: '1990-06-19',
    likedTracks:[track1,track2,track4],
    likedAlbums:[album1],

});

//SAVING AND RETURNING ID OF THE NEW USER
user10.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});



var user11= new User({
    email:"user11@example.com",
    password:"$2b$10$tZ9A05CzdvX9AodV6Q/aZOt/8bIIJT78rN3Ax1txwfkY8MJujc4ZK",  //111
    isActive:true,
    userName:"aya  ",
    gender:"F",
    birthDate: '1990-06-19',
    likedTracks:[track1,track2,track4],
    likedAlbums:[album1],

});

//SAVING AND RETURNING ID OF THE NEW USER
user11.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});



var user12= new User({
    email:"user12@example.com",
    password:"$2b$10$tZ9A05CzdvX9AodV6Q/aZOt/8bIIJT78rN3Ax1txwfkY8MJujc4ZK",  //111
    isActive:true,
    userName:"Samy",
    gender:"M",
    birthDate: '1990-06-19',
    likedTracks:[track1,track2,track4],
    likedAlbums:[album1],

});

//SAVING AND RETURNING ID OF THE NEW USER
user12.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});



var user13= new User({
    email:"user13@example.com",
    password:"$2b$10$tZ9A05CzdvX9AodV6Q/aZOt/8bIIJT78rN3Ax1txwfkY8MJujc4ZK",  //111
    isActive:true,
    userName:"william ",
    gender:"M",
    birthDate: '1990-06-19',
    likedTracks:[track1,track2,track4],
    likedAlbums:[album1],

});

//SAVING AND RETURNING ID OF THE NEW USER
user13.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});



var user14= new User({
    email:"user14@example.com",
    password:"$2b$10$tZ9A05CzdvX9AodV6Q/aZOt/8bIIJT78rN3Ax1txwfkY8MJujc4ZK",  //111
    isActive:true,
    userName:"harryPotter",
    gender:"M",
    birthDate: '1990-06-19',
    likedTracks:[track1,track2,track4],
    likedAlbums:[album1],

});

//SAVING AND RETURNING ID OF THE NEW USER
user14.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});




var user15= new User({
    email:"user15@example.com",
    password:"$2b$10$tZ9A05CzdvX9AodV6Q/aZOt/8bIIJT78rN3Ax1txwfkY8MJujc4ZK",  //111
    isActive:true,
    userName:"karma",
    gender:"F",
    birthDate: '1990-06-19',
    likedTracks:[track1,track2,track4],
    likedAlbums:[album1],

});

//SAVING AND RETURNING ID OF THE NEW USER
user15.save().then((res)=>{
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






/////////////////////////////////////////////////
//CREATING NEW PLAYLISTS
var playlist1 = new playlist({
    userId:user1._id,
    playlistName:"Dejavu",
    privacy:true,
    tracks:[track1,track2],
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
    tracks: [track5],

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
