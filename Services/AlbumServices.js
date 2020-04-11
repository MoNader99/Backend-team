// JavaScript source code
var { mongoose } = require("./../db/mongoose.js");
var ObjectID = require('mongodb').ObjectID;
var { album } = require("./../models/album.js");
var { GetArtistById } = require("./../Services/ArtistServices");
/**
 * determines if album is found
 * @method IsAlbumFound
 * @author aya
 * @param {string} albumid -the album that should be deleted
 * @returns {boolean} -determines if the album found
 * 
 */
var IsAlbumFound = function ( albumid) {
 

   return album.findOne({ _id: albumid }).then((Alb) => {
       if (!Alb) return false;
        return true;
    }).catch((e) => { return e });

}
/**
 * delete album if artist is authorized
 * @method DeleteIfAuthorized
 * @author aya
 * @param   {string} albumid -the id of the album that should be deleted
 * @param   {string} artistid -the id of the artist that should send the request
 * @returns {boolean} -return boolean that tedermines if artist is authorized
 * 
 */
var DeleteIfAuthorized = function (albumid,artistid) {
return album.findOne({ _id: albumid, artistId: artistid }).then((Alb) => {
    if (!Alb) return false;
    album.remove();
    return true;
}).catch((e) => { return e });
}
/**
 * delete album by artist
 * @method DeleteByArtist
 * @author aya
 * @param   {string} albumid -the id of the album that should be deleted
 * @param   {string} artistid -the id of the artist that should send the request
 * @returns {string} -return string that represents the response of the function
 * 
 */
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
/**
 * Get result albums of the search
 * @method GetAlbumObjectArray
 * @author aya
 * @param   {string} wordtosearch -the word I want to search about
 * @param   {array} Artists -the artists array resulting from search
 * @returns {array} -return array of albums that is the result of the search
 * 
 */
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
/**
 * function that handles search in albums in search requests
 * @method SearchInAlbums
 * @author aya
 * @param   {string} wordtosearch -the word I want to search about
 * @param   {array} Artists -the array of artists that should be returned from the search results
 * @returns {array} -return array of albums that is the result of the search
 * 
 */
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
/**
 * function that adds artist name
 * @method AddArtistName
 * @author aya
 * @param   {array} albums -the array of albums to add artist name
 * @returns {array} -return array of albums after adding artist name
 * 
 */
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
/**
 * function that simplifies album object
 * @method GetSimplifiedAlbum
 * @author aya
 * @param   {object} album -the album to be simplified
 * @returns {object} -album after simplifying
 * 
 */
 var GetSimplifiedAlbum= function (album) {
     console.log("beysimplifyalbum");
     return ((({ _id, albumName, imagePath, artistName, artistId }) => ({ _id, albumName, imagePath,artistName,artistId }))(album));

}
//var getsimplifiedalbum = function (album) {
 //   return getsimplifiedalbum1(album);
//}

module.exports = {
    DeleteByArtist,
    SearchInAlbums,
    album,
    GetSimplifiedAlbum
}