// JavaScript source code
var { mongoose } = require("./../db/mongoose.js");
var ObjectID = require('mongodb').ObjectID;
var { album } = require("./../models/album.js");


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

    DeleteByArtist("5e6d547b639f2ca419a1c098", "5e6d547b639f2ca419a1c0ab").then((str) => {
        console.log(str);
    }).catch((err) => {
        console.log(err)
    });
module.exports = {
    DeleteByArtist
}