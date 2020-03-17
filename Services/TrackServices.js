// JavaScript source code
var { track } = require("./../models/track.js");//track model
var { mongoose } = require("./../db/mongoose.js");
var _ = require('lodash');

var GetTrackObjectArray = function (wordtosearch) {
    return track.find({ trackName: wordtosearch });
}
var SearchInTracks = function (wordtosearch) {
    console.log("D5al");
    return GetTrackObjectArray(wordtosearch).then((tracks) => {
        console.log("ijgifjgf"+tracks.map(function (value) { return value._id }));
       return Promise.resolve(tracks.map(function (value) { return value._id }));
    }
    ).catch((err) => {
       return Promise.reject(err);
    })

}
module.exports = {
    SearchInTracks

}
