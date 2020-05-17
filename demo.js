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
var imgPath3 = "Adele.png";
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
    genres:["Pop","R&B"],
    rating: 4,
    imagePath:imgPath3,
    gender:"F",
    birthDate:"1988-05-05"
});
artist1.save();

var artist2= new artist({
    artistName:"Shbokshy",
    about:`Egyptian singer known professionally for nothing at all but still is pleased to be part and an artist in this application.Thank you babes `,
    genres:["Arabic","R&B"],
    imagePath:"defaultuser.png",
    rating: 4,
    gender:"M",
    birthDate:"1988-05-05"
});

artist2.save();


var artist3= new artist({

    artistName:"Eminem",
    about:`Marshall Bruce Mathers III (born October 17, 1972), known professionally as Eminem
     (/ˌɛmɪˈnɛm/; often stylized as EMINƎM), is an American rapper, songwriter, record producer,
     record executive and actor. He is one of the most successful musical artists of the 21st century.`,
    genres:["Trap","Jazz","Pop","Rap"],
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
    genres:["Arabic","Hip-Hop","R&B"],
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

var artist6= new artist({
    email:"travis@abc.com",
    password:"$2b$10$tZ9A05CzdvX9AodV6Q/aZOt/8bIIJT78rN3Ax1txwfkY8MJujc4ZK",  //111
    artistName:"Travis Scott",
    about:`Jacques Berman Webster II (born April 30, 1992), known professionally as Travis Scott (formerly stylized as Travi$ Scott), is an American rapper, singer, songwriter, and record producer. In 2012, Scott signed his first major-label deal with Epic Records.`,
    genres:["Rap","Trap"],
    rating: "8",
    imagePath:"Travis-Scott.jpg",
    gender:"M",
    birthDate:"1990-12-06"
});
artist6.save();

var artist7= new artist({
    email:"bernan@abc.com",
    password:"$2b$10$tZ9A05CzdvX9AodV6Q/aZOt/8bIIJT78rN3Ax1txwfkY8MJujc4ZK",  //111
    artistName:"Brennan Savage",
    about:`Brennan Savage makes bleary, confessional rap which draws equally from emo and trap. Often collaborating with producers and rappers associated with GothBoiClique, he's released numerous self-issued EPs and albums, including 2019's Tragedy. Savage was born in Long Beach, New York in 1996.`,
    genres:["Rap","Hip-Hop"],
    rating: "9",
    imagePath:"BernanSavage.jpg",
    gender:"M",
    birthDate:"1997-08-16"
});
artist7.save();

var artist8= new artist({
    email:"ragnboneman@abc.com",
    password:"$2b$10$tZ9A05CzdvX9AodV6Q/aZOt/8bIIJT78rN3Ax1txwfkY8MJujc4ZK",  //111
    artistName:"Rag'n'Bone Man",
    about:`Rory Charles Graham (born 29 January 1985), better known as Rag'n'Bone Man, is an English singer and songwriter. He is known for his deep baritone voice`,
    genres:["Blues","R&B"],
    rating: "6",
    imagePath:"ragsold.jpg",
    gender:"M",
    birthDate:"1980-05-05"
});
artist8.save();

var artist9= new artist({
    email:"hvob@abc.com",
    password:"$2b$10$tZ9A05CzdvX9AodV6Q/aZOt/8bIIJT78rN3Ax1txwfkY8MJujc4ZK",  //111
    artistName:"HVOB",
    about:`Anna Müller and Paul Wallner founded HVOB in 2012. The duo focuses on "restrained and minimalist" electronica with the use of vocals. After releasing music on SoundCloud they were discovered by Oliver Koletzki, a German dance and house music producer. ... The duo has been "voted as one of the best live acts in the world".`,
    genres:["Jazz","Hip-Hop","Electronic","Rock"],
    rating: "10",
    imagePath:"hvobavatars-000240092361-u41ssb-t500x500.jpg",
    gender:"F",
    birthDate:"1970-11-16"
});
artist9.save();

var artist10= new artist({
    email:"imagineDragons@abc.com",
    password:"$2b$10$tZ9A05CzdvX9AodV6Q/aZOt/8bIIJT78rN3Ax1txwfkY8MJujc4ZK",  //111
    artistName:"Imagine Dragons",
    about:`Imagine Dragons is an American pop rock band from Las Vegas, Nevada, consisting of lead singer Dan Reynolds, lead guitarist Wayne Sermon, bassist Ben McKee, and drummer Daniel Platzman.`,
    genres:["Pop","Electronic","Rock"],
    rating: "6",
    imagePath:"Imagine-Dragons-press-photo-credit-Eliot-Lee-Hazel-2017-a-billboard-1548.jpg",
    gender:"M",
    birthDate:"1971-11-09"
});
artist10.save();

var artist11= new artist({
    email:"Tones&I@abc.com",
    password:"$2b$10$tZ9A05CzdvX9AodV6Q/aZOt/8bIIJT78rN3Ax1txwfkY8MJujc4ZK",  //111
    artistName:"Tones and I",
    about:`Tones and I was born Toni Watson in Mornington Peninsula. In 2018, fed up with her retail job, she began busking in Melbourne and sometimes took special trips to the beachside town of Byron Bay to play songs for passing crowds. She quit her job when she became popular and even began winning busking competitions.`,
    genres:["Pop","Electronic"],
    rating: "10",
    imagePath:"TonesAndImaxresdefault.jpg",
    gender:"F",
    birthDate:"1975-08-07"
});
artist11.save();

var artist12= new artist({
    email:"queen@abc.com",
    password:"$2b$10$tZ9A05CzdvX9AodV6Q/aZOt/8bIIJT78rN3Ax1txwfkY8MJujc4ZK",  //111
    artistName:"Queen",
    about:`Queen composed music that drew inspiration from many different genres while still adopting a tongue-in-cheek attitude. For example, glam rock, psychedelic rock, hard rock, progressive rock, punk rock, heavy metal, pop, rhythm 'n blues, funk and disco, country, gospel and soul, and even music-hall and ragtime.`,
    genres:["Rock"],
    rating: "10",
    imagePath:"f45550f043abcd91714368ead086045c.jpg",
    gender:"F",
    birthDate:"1975-12-12"
});
artist12.save();

var artist13= new artist({
    email:"hippie@abc.com",
    password:"$2b$10$tZ9A05CzdvX9AodV6Q/aZOt/8bIIJT78rN3Ax1txwfkY8MJujc4ZK",  //111
    artistName:"Hippie Sabotage",
    about:`Hippie Sabotage is an indie duo from Sacramento, California, composed of brothers Kevin and Jeff Saurer. They were #1 on Billboard's Next Big Sound chart. They have performed with Ellie Goulding and Tove Lo and have worked with Cubic Z from We the Best Music Group`,
    genres:["Pop","Electronic","Rap"],
    rating: "6",
    imagePath:"Hippie-Sabotage.jpg",
    gender:"M",
    birthDate:"1967-05-11"
});
artist13.save();

var artist14= new artist({
    email:"pushaT@abc.com",
    password:"$2b$10$tZ9A05CzdvX9AodV6Q/aZOt/8bIIJT78rN3Ax1txwfkY8MJujc4ZK",  //111
    artistName:"Pusha T",
    about:`Terrence LeVarr Thornton (born May 13, 1977), better known by his stage name Pusha T, is an American rapper, songwriter and record executive. He initially gained major recognition as half of hip hop duo Clipse, alongside his brother and fellow rapper No Malice, with whom he founded Re-Up Records`,
    genres:["Pop","Hip-Hop","Trap"],
    rating: "4",
    imagePath:"Pusha-T749863_v9_bb.jpg",
    gender:"M",
    birthDate:"1988-03-11"
});
artist14.save();

var artist15= new artist({
    email:"AlecBenjamin@abc.com",
    password:"$2b$10$tZ9A05CzdvX9AodV6Q/aZOt/8bIIJT78rN3Ax1txwfkY8MJujc4ZK",  //111
    artistName:"Alec Benjamin",
    about:`Alec Benjamin is an American singer-songwriter, best known for his songs 'Paper Crown' and 'The Water Fountain. ' Born and raised in Phoenix, Arizona, Alec grew up listening to artists such as Paul Simon and Eminem. ... He grew up at a time when 'YouTube' was a major platform for young artists to showcase their talents`,
    genres:["Pop","Alternative Rock"],
    rating: "8",
    imagePath:"alecbenjaimindownload.jpg",
    gender:"M",
    birthDate:"1992-10-05"
});
artist15.save();

var artist16= new artist({
    email:"TheChainsmokers@abc.com",
    password:"$2b$10$tZ9A05CzdvX9AodV6Q/aZOt/8bIIJT78rN3Ax1txwfkY8MJujc4ZK",  //111
    artistName:"The Chainsmokers",
    about:`The Chainsmokers are an American electronic DJ and production duo consisting of Alexander "Alex" Pall and Andrew "Drew" Taggart. They started out by releasing remixes of songs by indie artists. The EDM-pop duo achieved a breakthrough with their 2014 song "#Selfie", which became a top twenty single in several countries.`,
    genres:["Pop","Electronic"],
    rating: "9.2",
    imagePath:"The-Chainsmokers-press-photo-by-Danilo-Lewis-2018-billboard-1548-1024x677.jpg",
    gender:"M",
    birthDate:"1999-10-05"
});
artist16.save();
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

var track10=new track({
    artistId:artist7._id,
    trackName:"Super Life",
    imagePath:"Superlife42011663_800_800.jpg",
    likes:12,
    genre:"R&B",
    trackPath:"2Scratch - SUPERLIFE (feat. Lox Chatterbox).mp3"  
    });   
track10.save();

var track11=new track({
    artistId:artist15._id,
    trackName:"Let Me Down Slowly",
    imagePath:"alecbenjaimindownload.jpg",
    likes:15,
    genre:"Pop",
    trackPath:"Alec Benjamin - Let Me Down Slowly (Lyrics).mp3"  
    });   
track11.save();

var track12=new track({
    artistId:artist13._id,
    trackName:"Baby Shark",
    imagePath:"default.jpeg",
    likes:13,
    genre:"Electronic",
    trackPath:"Baby Shark (Trap Remix).mp3"  
    });   
track12.save();

var track13=new track({
    artistId:artist6._id,
    trackName:"Focus",
    imagePath:"default.jpeg",
    likes:14,
    genre:"Trap",
    trackPath:"Bazzi - Focus (feat. 21 Savage) [Official Audio].mp3"  
    });   
track13.save();

var track14=new track({
    artistId:artist10._id,
    trackName:"Believer",
    imagePath:"Believer31UuFWejahL._SX331_BO1,204,203,200_.jpg",
    likes:18,
    genre:"Pop",
    trackPath:"Believer by Imagine Dragons Extended 10 minute version.mp3"  
    });   
track14.save();

var track15=new track({
    artistId:artist7._id,
    trackName:"In The Moment",
    imagePath:"IntheMoment.jpg",
    type:"Album",
    likes:19,
    genre:"Hip-Hop",
    trackPath:"brennan savage - in the moment (ft. drippin so pretty) [lyrics].mp3"  
    });   
track15.save();

var track16=new track({
    artistId:artist7._id,
    trackName:"Look At Me Now",
    imagePath:"LookatmeNow.jpg",
    type:"Album",
    likes:90,
    genre:"Hip-Hop",
    trackPath:"Brennan Savage - Look At Me Now.mp3"  
    });   
track16.save();

var track17=new track({
    artistId:artist13._id,
    trackName:"Devil Eyes",
    imagePath:"default.jpeg",
    likes:7,
    genre:"Electronic",
    trackPath:"HIPPIE SABOTAGE - DEVIL EYES LYRICS.mp3"  
    });   
track17.save();

var track18=new track({
    artistId:artist9._id,
    trackName:"Dogs",
    imagePath:"default.jpeg",
    likes:21,
    genre:"Jazz",
    trackPath:"HVOB - Dogs [Official].mp3"  
    });   
track18.save();

var track19=new track({
    artistId:artist9._id,
    trackName:"The Blame Game",
    imagePath:"hvobalbum.jpg",
    likes:80,
    type:"Album",
    genre:"Jazz",
    trackPath:"HVOB - Dogs [Official].mp3"  
    });   
track19.save();

var track20=new track({
    artistId:artist9._id,
    trackName:"Deus",
    imagePath:"hvobalbum.jpg",
    likes:13,
    type:"Album",
    genre:"Jazz",
    trackPath:"HVOB & Winston Marshall  Deus.mp3"  
    });   
track20.save();

var track21=new track({
    artistId:artist6._id,
    trackName:"Metro Boomin",
    imagePath:"default.jpeg",
    likes:3,
    genre:"Rap",
    trackPath:"Metro Boomin - Only 1 (Interlude) (with Travis Scott) [OFFICIAL AUDIO].mp3"  
    });   
track21.save();

var track22=new track({
    artistId:artist12._id,
    trackName:"Bohemian Rhapsody",
    imagePath:"BohemianRapsodydownload.jpg",
    likes:22,
    genre:"Pop",
    type:"Album",
    trackPath:"Queen - Bohemian Rhapsody (with lyrics).mp3"  
    });   
track22.save();

var track23=new track({
    artistId:artist12._id,
    trackName:"Lazing On A Sunday Afternoon",
    imagePath:"BohemianRapsodydownload.jpg",
    likes:2,
    type:"Album",
    genre:"Rock",
    trackPath:"Queen -Lazing On A Sunday Afternoon - Official Music Video (High Quality).mp3"  
    });   
track23.save();

var track24=new track({
    artistId:artist8._id,
    trackName:"Human",
    imagePath:"Human_-_Rag'n'Bone_Man_Single.png",
    likes:26,
    genre:"R&B",
    type:"Album",
    trackPath:"Rag'n'Bone Man - Human (Official Video).mp3"  
    });   
track24.save();

var track25=new track({
    artistId:artist8._id,
    trackName:"Skin",
    imagePath:"Human_-_Rag'n'Bone_Man_Single.png",
    likes:24,
    type:"Album",
    genre:"Hip-Hop",
    trackPath:"Rag'n'Bone Man - Skin (Official Audio).mp3"  
    });   
track25.save();

var track26=new track({
    artistId:artist11._id,
    trackName:"Dance Monkeys",
    imagePath:"Thekidsarecomingt458429634-b1475930049_s400.jpg",
    likes:99,
    type:"Album",
    genre:"Electronic",
    trackPath:"Tones and I - Dance Monkey (Lyrics).mp3"  
    });   
track26.save();

var track27=new track({
    artistId:artist11._id,
    trackName:"The Kids Are Coming",
    imagePath:"Thekidsarecomingt458429634-b1475930049_s400.jpg",
    likes:33,
    type:"Album",
    genre:"Electronic",
    trackPath:"TONES AND I - THE KIDS ARE COMING (LYRIC VIDEO).mp3"  
    });   
track27.save();

var track28=new track({
    artistId:artist6._id,
    trackName:"Highest In The Room",
    imagePath:"Thekidsarecomingt458429634-b1475930049_s400.jpg",
    likes:45,
    type:"Album",
    genre:"Rap",
    trackPath:"Travis Scott - HIGHEST IN THE ROOM (Audio).mp3"  
    });   
track28.save();

var track29=new track({
    artistId:artist6._id,
    trackName:"Impossible",
    imagePath:"highest6d8141339179503ce00770fd483cadff.jpg",
    likes:40,
    type:"Album",
    genre:"Rap",
    trackPath:"Travis Scott impossible with lyrics.mp3"  
    });   
track29.save();

var track30=new track({
    artistId:artist6._id,
    trackName:"Unknown",
    imagePath:"highest6d8141339179503ce00770fd483cadff.jpg",
    likes:7,
    type:"Album",
    genre:"Rap",
    trackPath:"Travis Scott Ft. Future & 2 Chainz - 3500 (For The Coat )(CDQ).mp3"  
    });   
track30.save();

var track31=new track({
    artistId:artist14._id,
    trackName:"Venom",
    imagePath:"default.jpeg",
    likes:11,
    genre:"Trap",
    trackPath:"VENOM (2018) Pusha T No Problem Eddie Brock.mp3"  
    });   
track31.save();

var track32=new track({
    artistId:artist2._id,
    trackName:"Ebbo Msh Baskota",
    imagePath:"default.jpeg",
    likes:8,
    genre:"Arabic",
    trackPath:"الوصيةأغنية إبو مش بسكوتة إبو ده حدوتة غناء بيومي فؤاد.mp3"  
    });   
track32.save();

var track33=new track({
    artistId:artist2._id,
    trackName:"Mahrgan El Shbokshy",
    imagePath:"default.jpeg",
    likes:9,
    genre:"Arabic",
    trackPath:"مهرجان الشبوكشي فيفتي سنت FT عمرو حاحا YouTube.mp3"  
    });   
track33.save();

var track34=new track({
    artistId:artist16._id,
    trackName:"Don't Let Me Down",
    imagePath:"default.jpeg",
    likes:27,
    genre:"Pop",
    trackPath:"The Chainsmokers - Don't Let Me Down ft. Daya (Official Music Video).mp3"  
    });   
track34.save();
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

var album3 = new album({
    artistId:artist7._id,
    albumName:"Look At Me Now Album",
    imagePath:"LookatmeNow.jpg",
    tracks: [track15, track16],
});

album3.save();

var album4 = new album({
    artistId:artist9._id,
    albumName:"Trailog",
    imagePath:"hvobalbum.jpg",
    tracks: [track19, track20],
});

album4.save();

var album5 = new album({
    artistId:artist12._id,
    albumName:"A Night at the Opera",
    imagePath:"BohemianRapsodydownload.jpg",
    tracks: [track22, track23],
});

album5.save();

var album6 = new album({
    artistId:artist8._id,
    albumName:"Human",
    imagePath:"Human_-_Rag'n'Bone_Man_Single.png",
    tracks: [track24, track25],
});

album6.save();

var album7 = new album({
    artistId:artist11._id,
    albumName:"The Kids Are Coming",
    imagePath:"Thekidsarecomingt458429634-b1475930049_s400.jpg",
    tracks: [track26, track27],
});

album7.save();

var album8 = new album({
    artistId:artist6._id,
    albumName:"1/2",
    imagePath:"highest6d8141339179503ce00770fd483cadff.jpg",
    tracks: [track28, track29,track30],
});

album8.save();

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

