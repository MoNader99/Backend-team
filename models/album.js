const mongoose = require("mongoose");
const Schema=mongoose.Schema;
var ObjectID = require('mongodb').ObjectID;
var { images, ImagesSchema } = require("./images.js"); // images model
//var { artist } = require("../models/artists.js");
const defaultModule = require("./../defaultimage");


var AlbumSchema = new mongoose.Schema({
    albumName: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    image: {
        type: ImagesSchema,
        required: true,
        default: defaultModule.defaultImage._doc
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
    rating:{
        type:Number,
        default:null,
        required:false,
        min:1,
        max:10,
  
    },
    likes:{
      type:Number,
      default:0,
      required:true,
      min:0,
    },
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
/*AlbumSchema.methods.findartistname = function () {
    alb = this;
    artid = alb.artistId;
    return artist.findById({artid});

}*/
var album = mongoose.model('albums', AlbumSchema);


module.exports = {album};