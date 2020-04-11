// JavaScript source code
var { mongoose } = require("./../db/mongoose.js");
var { playlist } = require("./../models/playlists.js");//track model
var { GetUserById } = require("./../Services/UserServices");
/**
 * Get result playlists of the search
 * @method GetPlaylistObjectArray
 * @author aya
 * @param   {string} wordtosearch -the word I want to search about
 * @returns {array} -return array of playlists that is the result of the search
 * 
 */
var GetPlaylistObjectArray = async function (wordtosearch) {
    console.log("getplaylistObjectArray");
   // const playlists = await playlist.find({ 'playlistName': { '$regex': wordtosearch, $options: 'i' } })
   // console.log(playlists);
    return playlist.find({ 'playlistName': { '$regex': wordtosearch, $options: 'i' } });

}
/**
 * function that handles search in playlists in search requests
 * @method SearchInPlaylists
 * @author aya
 * @param   {string} wordtosearch -the word I want to search about
 * @returns {array} -return array of playlists that is the result of the search
 * 
 */
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
/**
 * function that adds user name
 * @method AddUserName
 * @author aya
 * @param   {array} playlists -the array of playlists to add artist name
 * @returns {array} -return array of playlists after adding user name
 * 
 */
var AddUserName = async function (playlists) {

    const promises = playlists.map(async playlist => {

        const userName = await GetUserById(playlist.userId);

        return Object.assign(playlist, { userName: userName})


    });
    return Promise.resolve(await Promise.all(promises));

}
/**
 * function that simplifies playlist object
 * @method GetSimplifiedPlaylist
 * @author aya
 * @param   {object} playlist -the playlist to be simplified
 * @returns {object} -playlist after simplifying
 * 
 */
var GetSimplifiedPlaylist = function (playlist) {
    console.log("getsimplifiedplaylist");
    return ((({ _id, playlistName, imagePath, userName, userId }) => ({ _id, playlistName, imagePath, userName, userId}))(playlist));

}
//SearchInPlaylists("deja");
module.exports = {
    SearchInPlaylists,
    playlist
}