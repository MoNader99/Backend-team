const mongoose = require("mongoose");
const Schema=mongoose.Schema;
var ObjectID = require('mongodb').ObjectID;
//var { artist } = require("../models/artists.js");

var { track } = require("../models/track.js");


var AlbumSchema = new mongoose.Schema({
    albumName: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    imagePath: {
        type: String,
        required: true,
        default: "default.jpeg",
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
    ],
    likes:{
      type:Number,
      default:0,
      required:true,
      min:0,
    },
})
var deletealbumtracks = function (album) {
   return track.deleteMany({ '_id': { $in: album.tracks.map(function (value) { return value.toString() }) } });
}
AlbumSchema.statics.deletebyartist = function (artistid, albumid) {
    album = this;
   // artistid = new ObjectID(artistid);
    
    return album.findOne({ _id: albumid }).then((Album) => {

        if (!Album) {
            console.log("not album")
            return Promise.reject("Notfound");

        }
        if (Album.artistId.toString() === artistid) {
            console.log("ukpl");
            return album.findByIdAndRemove(albumid).then((alb) => {
                //var trackstobedeleted = alb.tracks;
                //console.log(trackstobedeleted);
                //var tracksids = trackstobedeleted.map(function (value) { return value._id })
                //trackstobedeleted.map(function (value) { return value._id.toString() })
                return deletealbumtracks(alb).then((result) => {
                    return Promise.resolve("deleted");

                }).catch((err) => {
                    return Promise.reject(err);
                })

                console.log("kfho");
                
            }).catch((e) => {
                console.log("kfojf");
                return Promise.reject(e);
            });
        }
        else {
            console.log(artistid);
            console.log("id");
            console.log(Album.artistId);
            return Promise.reject("NotAuthorized");

        }
        console.log("fejeif");
        str = "z"
    }).catch((err) => {
        console.log(err);
        return Promise.reject(err);
    })
        ;
}
/*AlbumSchema.methods.findartistname = function () {
    alb = this;
    artid = alb.artistId;
    return artist.findById({artid});

}*/
var album = mongoose.model('albums', AlbumSchema);


module.exports = {album};