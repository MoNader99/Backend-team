// JavaScript source code
var { track } = require("./../models/track.js");//track model
var { mongoose } = require("./../db/mongoose.js");
var _ = require('lodash');
var { GetArtistById } = require("./../Services/ArtistServices");
var GetTrackObjectArray = function (wordtosearch) {
    //return track.find({ trackName: wordtosearch });
    return track.find({ 'trackName': { '$regex': wordtosearch, $options: 'i' } });
        
}

var SearchInTracks = function (wordtosearch) {
    
    return GetTrackObjectArray(wordtosearch).then(async (tracks) => {
        
        if (tracks.length === 0) return Promise.resolve([]);
        const Tracks = await AddArtistName(tracks);
        console.log(Tracks);
        console.log(1);

        console.log(Tracks.map(Track => GetSimplifiedTrack(Track)));
        console.log(2);

        return Promise.resolve(Tracks.map(track=> GetSimplifiedTrack(track)));



    })
        // return Promise.resolve(albums);
        .catch((err) => {
            return Promise.reject(err);
        })

}
var AddArtistName = async function (tracks) {
    console.log("adadadadadadadadadadadadadadadavf,vldfv");
    console.log("adadadadadadadadadadadadadadadaf,dvmfvfl");
    var i = 1;
    var length = tracks.length;
    console.log(length);
    const promises = tracks.map(async track => {

        const ArtistName = await GetArtistById(track.artistId.toString());

        return Object.assign(track, { ArtistName: ArtistName })


    });
    return Promise.resolve(await Promise.all(promises));

}
var GetSimplifiedTrack = function (track) {
    console.log(track);
    console.log("beysimplify");
    return ((({ _id, trackName, image, ArtistName }) => ({ _id, trackName, image, ArtistName }))(track));

}


module.exports = {
    SearchInTracks,
    track

}
