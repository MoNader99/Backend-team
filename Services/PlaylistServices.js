// JavaScript source code
var { mongoose } = require("./../db/mongoose.js");
var { playlist } = require("./../models/playlists.js");//track model
var { GetUserById } = require("./../Services/UserServices");

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

        const Playlists = await AddUserName(playlists);
        return Promise.resolve(Playlists.map(playlist => GetSimplifiedPlaylist(playlist)));

    })
        .catch((err) => {
            console.log(err);
            return Promise.reject(err);
        })

}
var AddUserName = async function (playlists) {

    const promises = playlists.map(async playlist => {

        const userName = await GetUserById(playlist.userId);

        return Object.assign(playlist, { userName: userName})


    });
    return Promise.resolve(await Promise.all(promises));

}
var GetSimplifiedPlaylist = function (playlist) {
    console.log("getsimplifiedplaylist");
    return ((({ _id, playlistName, imagePath, userName, userId }) => ({ _id, playlistName, imagePath, userName, userId}))(playlist));

}
//SearchInPlaylists("deja");
module.exports = {
    SearchInPlaylists,
    playlist
}