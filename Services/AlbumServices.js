// JavaScript source code
var { mongoose } = require("./../db/mongoose.js");
var ObjectID = require('mongodb').ObjectID;
var { album } = require("./../models/album.js");
var{track}=require("./../models/track.js");
const path = require('path');
var { GetArtistById } = require("./../Services/ArtistServices");
var IsAlbumFound = function ( albumid) {
 

   return album.findOne({ _id: albumid }).then((Alb) => {
       if (!Alb) return false;
        return true;
    }).catch((e) => { return e });

}
var DeleteIfAuthorized = function (albumid,artistid) {
return album.findOne({ _id: albumid, artistId: artistid }).then((Alb) => {
    if (!Alb) return false;
    album.remove();
    return true;
}).catch((e) => { return e });
}
var DeleteByArtist = function (albumid, artistid) {
   return IsAlbumFound(albumid).then((isfound) => {
        if (!isfound) return "Notfound";
        if (isfound) {
            return DeleteIfAuthorized(albumid, artistid).then((isauthorized) => {
                if (!isauthorized) return "NotAuthorized"
                if(isauthorized) return "Deleted"
            }).catch((e) => { return e });
        }
        }
   ).catch(() => {
   })
    }

var GetAlbumObjectArray =function (wordtosearch,Artists) {
   // return album.find({ albumName: wordtosearch });
   // console.log(Artists);
    //const artists = await Artists.map(function (value) { return value._id.toString() });
   // console.log(Artists.map(function (value) { return value._id.toString() }));
   // { $or: [{ a: 1 }, { b: 1 }] }
    return album.find({ $or: [{ 'albumName': { '$regex': wordtosearch, $options: 'i' } }, { 'artistId': { $in: Artists.map(function (value) { return value._id.toString() }) } }] });

   // return album.find({ 'albumName': { '$regex': wordtosearch, $options: 'i' }, 'artistId': { $in: Artists.map(function (value) { return value._id.toString() })  } } );

    
}
/*var getsimplifiedalbum = function (album) {
    id = album._id;
    name = album.albumName;
    image = album.image;
    artid = album.artistid
    album= {ID:id,AlbumName:name,Image:image,Artid:artid};
}*/
var SearchInAlbums =function (wordtosearch,Artists) {
    console.log("adadadadadadadadadadadadadadada");
    return GetAlbumObjectArray(wordtosearch,Artists).then(async(albums) => {
        // console.log("ijgifjgf" + albums.map(function (value) { return value._id, value.albumName, value.image, value.artistId }));
        // return Promise.resolve(albums.map(function (value) { return value._id, value.albumName, value.image, value.artistId  }));

        //, albumname: a.albumName,albumimage: a.image,artistid: a.artistId
        // return Promise.resolve(albums.map(a =>9 { albumid: a._id })); 
        //return Promise.resolve((({ a, c }) => ({ a, c }))(album));
        if (albums.length === 0) return Promise.resolve([]);
      //  return Promise.resolve(albums.forEach(album => { (({ _id, albumName, image, artistId }) => ({ _id, albumName, image, artistId }))(album); }));
        //console.log("promises");
       // console.log(AddArtistName(albums));
        //console.log(await Promise.all(AddArtistName(albums)));
       /* const promises = await Promise.resolve(AddArtistName(albums));
       // const Albums = await Promise.all(promises);
       // console.log(Albums);
        console.log(promises);*/
        const Albums =await AddArtistName(albums);
        console.log(Albums);
        //console.log(await AddArtistName(albums))
        //.then((Albums) => {
          //  console.log("albums");
           // console.log(Albums);
        console.log(Albums.map(album => GetSimplifiedAlbum(album)));
            return Promise.resolve(Albums.map(album => GetSimplifiedAlbum(album)));
               // }
       // );
       // return Promise.resolve(albums.map(album => getsimplifiedalbum(album)));
       // }).then(()=>{return Promise.resolve(albums)})
            
            

    })
       // return Promise.resolve(albums);
    .catch((err) => {
        return Promise.reject(err);
    })

}

var AddArtistName = async function (albums) {
    var i = 1;
    var length = albums.length;
    console.log(length);
   const promises=albums.map(async album => {
       console.log(2);
      // try {
           const artistName = await GetArtistById(album.artistId.toString());
      // }
       //catch (err) {
        //   console.log(err);
       //}
            //console.log(i);
            // console.log(album);
            // album["ArtistName"] = ArtistName;
            // return Promise.resolve(Object.assign(album, { ArtistName: ArtistName }));
            //return Promise.resolve({ ...album, ...{ ArtistName: ArtistName } });
            // });

            //  console.log("hw ada"+album.ArtistName);
            
          //  return { ...album, ...{ ArtistName: ArtistName } };
       console.log(3);

       return Object.assign(album, {artistName:artistName})
            // console.log(albums);
            // if (i++ === length) {
            //    console.log("raga3o");
            //   return Promise.resolve(albums);
            //+5  }

        

    });
    //console.log(await Promise.all(promises));
    //console.log(promises);
    return Promise.resolve(await Promise.all(promises));

}
 var GetSimplifiedAlbum= function (album) {
     console.log("beysimplifyalbum");
     return ((({ _id, albumName, imagePath, artistName, artistId }) => ({ _id, albumName, imagePath,artistName,artistId }))(album));

}
//var getsimplifiedalbum = function (album) {
 //   return getsimplifiedalbum1(album);
//}

async function newAlbum(artistIdSent,albumname,myfiles) {
    
    var i = 0;var tracksArr = [];
    while(myfiles[i])
    {
        var trackpath = path.parse(myfiles[i].originalname).name+"--"+artistIdSent+"."+"mp3";
        await track.findOne({trackPath:trackpath}).then((myTrack) =>
        {
            tracksArr.push(new track);
            tracksArr[i]=myTrack;
            
        })
        i++;
        
    }
    var albumInstance = new album({
        artistId:artistIdSent,
        albumName:albumname,
        tracks:tracksArr
    });
    albumInstance.save().then((res)=>{
        console.log(res._id);
    },(err)=>{
        console.log(err);
    });

}

module.exports = {
    DeleteByArtist,
    SearchInAlbums,
    album,
    GetSimplifiedAlbum,
    newAlbum
}