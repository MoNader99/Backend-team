// JavaScript source code
var { mongoose } = require("./../db/mongoose.js");
var ObjectID = require('mongodb').ObjectID;
var _ = require('lodash');
var { track } = require("./../models/track.js");//track model

var { GetArtistById } = require("./../Services/ArtistServices");
var GetTrackObjectArray =async function (wordtosearch,Artists) {
    //return track.find({ trackName: wordtosearch });
   // return track.find({ 'trackName': { '$regex': wordtosearch, $options: 'i' } , 'artistId': { $in: Artists.map(function (value) { return value._id }) } } );
   // try {
   // console.log(Artists.map(function (value) { return value._id.toString() }));
   
   return track.find({ $or: [{ 'trackName': { '$regex': wordtosearch, $options: 'i' } }, { 'artistId': { $in: Artists.map(function (value) { return value._id.toString() }) } }] });
    //var tracks = await track.find({ $or: [{ 'trackName': { '$regex': wordtosearch, $options: 'i' } }, { 'artistId': { $in: Artists.map(function (value) { return value._id.toString() }) } }] });
    //var tracks =
    //console.log(tracks);
    //return tracks;
  //  ['5e6942b6646c86bc20fc9a92']

      //  return track.find({ 'artistId': '5e6942b6646c86bc20fc9a92' });

 //   }
  //  catch (err) {
  //      console.log(err);
  //  }
   // var tracks = await track.find({ 'artistId':  });

}

var SearchInTracks = function (wordtosearch,Artists) {
    console.log("da5aal 2el search in tracks");

    return GetTrackObjectArray(wordtosearch, Artists).then(async (tracks) => {
        console.log(tracks);
        console.log("da5aal 2el get rack");
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
            console.log(err);
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

        const artistName = await GetArtistById(track.artistId.toString());

        return Object.assign(track, { artistName: artistName })


    });
    return Promise.resolve(await Promise.all(promises));

}
var GetSimplifiedTrack = function (track) {
    console.log(track);
    console.log("beysimplifytracks");
    return ((({ _id, trackName, imagePath, artistName, artistId }) => ({ _id, trackName, imagePath, artistName, artistId }))(track));

}


module.exports = {
    SearchInTracks,
    track
}
