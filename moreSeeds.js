//ARTISTS
/*var artist5= new artist({
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
    about:"Coldplay came together as a band in late 1997 when Guy Berryman, Jonny Buckland, Will Champion and Chris Martin met at University College, London .The band have gone on to become one of the planet’s most popular acts, selling more than 75 million copies of their seven Number One albums, which have spawned a string of classic hits including Yellow, Clocks, Fix You, Paradise, Viva La Vida and A Sky Full Of Stars. They’ve also filled their trophy cabinet with almost every major music award there is (including seven Grammys and nine BRITs). ",
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//MORE USERS
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
//////////////////////////////////////////////////////////////////////////////////////
//PLAYLISTS
var playlist6 = new playlist({
    playlistName:"New Pop",
    tracks:[track1,track15,track12],
});

playlist6.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});

var playlist7 = new playlist({
    playlistName:"Party Time",
    tracks:[track9,track21,track22,track5],
});

playlist7.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});

var playlist8 = new playlist({
    playlistName:"New Soft Pop",
    tracks:[track1,track2,track10,track11],
});

playlist8.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});

var playlist9 = new playlist({
    playlistName:"Adele",
    tracks:[track1,track2,track3],
    imagePath:imgPath3,
});

playlist9.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});

var playlist10 = new playlist({
    playlistName:"Eminem",
    tracks:[track4,track5],
    imagePath:imgPath6,
});

playlist10.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});

var playlist11 = new playlist({
    playlistName:"Amr Diab",
    tracks:[track8,track9],
    imagePath:imgPath5,
});

playlist11.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});

var playlist12 = new playlist({
    playlistName:"Billie Eillish",
    tracks:[track6,track7],
    imagePath:imgPath2,
});

playlist12.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});

var playlist13 = new playlist({
    playlistName:"Recently Played",
    tracks:[track1,track7,track12,track21,track4],
});

playlist13.save().then((res)=>{
    console.log(res._id);
},(err)=>{
    console.log(err);
});


///////////////////////////////////////////////////////////////////////////////////////////
//MORE ALBUMS
var album4 = new album({
    artistId:artist6._id,
    albumName:"Bangerz",
    imagePath:imgPath8,
    likes:5,
    tracks: [track13, track14],


});

album4.save().then((res)=>{
    console.log(res._id);
},(err)=>{

    console.log(err);
});






var album5 = new album({
    artistId:artist7._id,
    albumName:"Amz Lkhatm",
    imagePath:imgPath9,
    likes:9,
    tracks: [track16],


});

album5.save().then((res)=>{
    console.log(res._id);
},(err)=>{

    console.log(err);
});


var album6 = new album({
    artistId:artist8._id,
    imagePath:imgPath10,
    albumName:"Divide",
    likes:10,
    tracks: [track17,track18,track19],


});

album6.save().then((res)=>{
    console.log(res._id);
},(err)=>{

    console.log(err);
});




var album7 = new album({
    artistId:artist9._id,
    albumName:"Rare",
    imagePath:imgPath11,
    likes:10,
    tracks: [track21,track22],


});

album7.save().then((res)=>{
    console.log(res._id);
},(err)=>{

    console.log(err);
});

*/