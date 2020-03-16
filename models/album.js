const mongoose = require("mongoose");
const Schema=mongoose.Schema;
var ObjectID = require('mongodb').ObjectID;
var AlbumSchema = new mongoose.Schema({
    albumName: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    artistId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "artists"
    },
    tracks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "track"
        }
    ]
})

AlbumSchema.statics.deletebyartist = function (artistid, albumid) {
    album = this;
   // artistid = new ObjectID(artistid);
    
    return album.findOne({ _id: albumid }).then((Album) => {

        if (!Album) {
            console.log("not album")
            return Promise.reject("not album");

        }
        if (Album.artistId.toString() === artistid) {
            console.log("ukpl");
            return album.findByIdAndRemove(albumid).then((alb) => {
                console.log("kfho");
                return Promise.resolve("deleted");
            }).catch((e) => {
                console.log("kfojf");
                return Promise.reject(e);
            });
        }
        else {
            console.log(artistid);
            console.log(Album.artistId._id);
            return Promise.reject("not authorized");

        }
        console.log("fejeif");
        str = "z"
    }).catch((err) => {
        console.log(err);
        return Promise.reject(err);
    })
        ;
}

var album = mongoose.model('albums', AlbumSchema);


module.exports = {album};