// JavaScript source code
var { mongoose } = require("./../db/mongoose.js");
var { playlist } = require("./../models/playlists.js");//track model

var GetPlaylistObjectArray = async function (wordtosearch) {
    console.log("getplaylistObjectArray");
   // const playlists = await playlist.find({ 'playlistName': { '$regex': wordtosearch, $options: 'i' } })
   // console.log(playlists);
    return playlist.find({ 'playlistName': { '$regex': wordtosearch, $options: 'i' } });

}
var SearchInPlaylists = function (wordtosearch) {
    console.log("searchinplaylist");

    return GetPlaylistObjectArray(wordtosearch).then(async (playlists) => {
        if (playlists.length === 0) return Promise.resolve([]);

        return Promise.resolve(playlists.map(playlist => GetSimplifiedPlaylist(playlist)));

    })
        .catch((err) => {
            console.log(err);
            return Promise.reject(err);
        })

}
var GetSimplifiedPlaylist = function (playlist) {
    console.log("getsimplifiedplaylist");
    return ((({ _id, playlistName, image}) => ({ _id, playlistName, image}))(playlist));

}
//SearchInPlaylists("deja");
module.exports = {
    SearchInPlaylists,
    playlist
}