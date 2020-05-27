// JavaScript source code
var { mongoose } = require("./../db/mongoose.js"); 
var { artist } = require("./../models/artists.js");  //artists model
var userServices = require("./../Services/UserServices");
var { album } = require("./../models/album.js");
var { track } = require("./../models/track.js");//track model
var { followArtist } = require("./../models/followArtist.js");//track model
var { notification } = require("./../models/notifications.js");//notifications model
var notificationServices = require("./../Services/NotificationServices");


var GetTracksOfArtists = function (id) {
    return track.find({ artistId: id });
}
var GetAlbumsOfArtists = function (id) {
    return album.find({ artistId: id });
}
var getFollowArtistObject = function () {
    return followArtist.find({ 'userId': { $in: Artists.map(function (value) { return value.user_id.toString() }) } });

}
/**
 * this function return artists that a user follows
 * @author aya
 * @method getFollowedArtists
 * 
 *@param {string} userId
 *@returns {array}  -returns array of ids of the artists a user follows
 * 
 */
var getFollowedArtists = async function (userId) {
    var FollowedArtists = await followArtist.findOne({ 'user_id': userId });//.followedArtistInfo;
    return FollowedArtists.followedArtistInfo.map(function (value) { return value.artistId.toString(); });
        /*return followArtist.findOne({ 'user_id': userId }).followedArtistInfo;//.map(function (value) { return value.artistId.toString() }) ;
   then((fol) => {
        //console.log(userId);
        //console.log(fol);
        console.log(fol.followedArtistInfo);
    })*/
}
/**
 * this function return user that follows a certain artist
 * @author aya
 * @method getUsersFollowingArtists
 * 
 *@param {string} artistId
 *@returns {array}  -returns array of ids of the users that follows an artist
 * 
 */
var getUsersFollowingArtists = async function (artistId) {
    var FollowedArtists = await followArtist.find({ 'followedArtistInfo.artistId':artistId });//.followedArtistInfo;
    return FollowedArtists.map(function (value) { return value.user_id.toString(); });

}
/**
 * remove the followed artist from the array of the artist that a user follow
 * @author aya
 * @method deleteArtistFromSchema
 * 
 *@param {string} artistId
 *@param {string} userId
 *@returns {document}  -return the document of the follow artist after update
 * 
 */
var deleteArtistFromSchema = function (artistId, userId) {
   // followArtist.findOne({ 'userId': userId }).then((userfollow) => {
    console.log(userId);
    console.log(artistId);
    //return followArtist.update({ 'user_id': userId }, { $pullAll: { artistId: [artistId] } })
    return followArtist.update({ user_id: userId }, { "$pull": { "followedArtistInfo": { "artistId": artistId } } });

}

/**
 * add the followed artist in the array of the artists that a user follow
 * @author aya
 * @method addArtistToSchema
 * 
 *@param {string} artistId
 *@param {string} userId
 *@param {string} artistName
 *@returns {document}  -return the document of the follow artist after update
 * 
 */
var addArtistToSchema = function (artistId, userId,artistName) {
    // followArtist.findOne({ 'userId': userId }).then((userfollow) => {

    console.log("da5al hena");
    console.log(userId);
    console.log(artistId);
    //return followArtist.update({ 'user_id': userId }, { $pullAll: { artistId: [artistId] } })
    return followArtist.update({ user_id: userId }, { "$push": { "followedArtistInfo": { "artistId": artistId, "artistName": artistName, "followDate":Date.now() } } });

}
/**
 * the function that handles follow and unfollow artist request
 * @author aya
 * @method unFollowUser
 * 
 *@param {string} artistId
 *@param {string} userId
 *@returns {string}  -returns "unfollowed" if the artist is unfollowed "followed" if the artist is followed
 * 
 */
var unFollowArtist = function (artistId, userId) {
    return deleteArtistFromSchema(artistId, userId).then((Artist) => {
        if (Artist.nModified == 1) return "unfollowed";
        console.log("2wel art");
        console.log();
        //console.log(artist);
        if (Artist.nModified == 0) {
            return userServices.GetUserById(userId).then((userName) => {
                return artist.findById(artistId).then((art) => {
                    var array = [];
                    array[0] = artistId;
                    var notificationInstance = new notification({
                        text: userName + " has followed " + "you",
                        sourceId: userId,
                        userType: "user",
                        shouldBeSentTo: array,
                        date: Date.now()

                    });
                    notificationInstance.save();
                    var arr = [];
                    arr[0] = art.endPoint;
                    notificationServices.pushNotification(notificationInstance.text, arr);

                    return GetArtistById(artistId).then((artistName) => {
                        return addArtistToSchema(artistId, userId, artistName).then((artist2) => {
                            console.log("tane art");
                            //console.log(artist2);
                            if (artist2.nModified == 1) return "followed";
                            else {
                                console.log(1);
                                console.log(2);
                                var followArtist1 = new followArtist({
                                    user_id: userId,
                                    followedArtistInfo: [{
                                        artistId: artistId,
                                        artistName: artistName,
                                        followDate: Date.now(),
                                        //rate:2,
                                    }
                                    ]
                                });
                                console.log(3);
                                return followArtist1.save().then((res) => {
                                    console.log(4);
                                    return "followed";
                                }, (err) => {
                                    return err;
                                });



                            }
                        });
                    });
                });
            });
            }
 
    }).catch((err) => {
        Promise.reject(err);
    })


}
var addartist = (Email, Password, Artistname, About, Genres) => {
    var artist1 = new artist({
        email: Email,
        password: Password,
        artistName: Artistname,
        about: About,
        genres: Genres
    });
    console.log('da5al');
    //SAVING AND RETURNING ID OF THE NEW ARTIST
    artist1.save().then((res) => {
        console.log(res._id);
    }, (err) => {
        console.log(err);
    });
}


var GetArtistObjectArray = function (wordtosearch) {
    //return artist.find({ artistName: wordtosearch });
    return artist.find({ 'artistName': { '$regex': wordtosearch, $options: 'i' } });

    
}
var SearchInArtists = function (wordtosearch) {
    console.log("D5al");
    return GetArtistObjectArray(wordtosearch).then((artists) => {
        console.log("ijgifjgf" + artists.map(function (value) { return value._id }));
        return Promise.resolve(artists.map(function (value) { return value._id }));
    }
    ).catch((err) => {
        return Promise.reject(err);
    })
}
/**
 * the function that returns a certain artist by his id
 * @author aya
 * @method GetArtistById
 * 
 *@param {string} id
 *@returns {object}  -returns object of auser with a certain id
 * 
 */
var GetArtistById = function (id) {
    console.log(id);
    console.log(artist.findById(id).artistName);
    return artist.findById(id).then((Art) => {
        if (!Art) return "undefined";
        console.log(Art.artistName);
        return Art.artistName;

    })
}

var SearchInArtists = function (wordtosearch) {
    console.log("adadadadadadadadadadadadadadada");
    return GetArtistObjectArray(wordtosearch).then(async (artists) => {
        console.log(1);
        if (artists.length === 0) return Promise.resolve([]);
        console.log(2);

        //const ArtistsWithTracks = await AddTracks(artists);

        //const Artists = await AddAlbums(ArtistsWithTracks);


        return Promise.resolve(artists.map(artist => GetSimplifiedArtist(artist)));




    })
        // return Promise.resolve(albums);
        .catch((err) => {
            return Promise.reject(err);
        })

}
var AddTracks = async function (artists) {

    const promises = artists.map(async artist => {

        const Tracks = await GetTracksOfArtists(artist._id);
        const tracks = await Tracks.map(track => ((({ _id, trackName, imagePath }) => ({ _id, trackName, imagePath}))(track)));

        return Object.assign(artist, { Tracks:tracks })


    });
    return Promise.resolve(await Promise.all(promises));

}
var AddAlbums = async function (artists) {

    const promises = artists.map(async artist => {

        const Albums = await GetAlbumsOfArtists(artist._id);
        const albums = await Albums.map(album => ((({ _id, albumName, imagePath }) => ({ _id, albumName, imagePath}))(album)));
        return Object.assign(artist, { Albums: albums })


    });
    return Promise.resolve(await Promise.all(promises));

}
var GetSimplifiedArtist = function (artist) {
    console.log("beysimplifyartist");
    console.log(artist.image);
    return ((({ _id, artistName, imagePath, Albums, Tracks }) => ({ _id, artistName, imagePath,Albums,Tracks}))(artist));

}
module.exports = {
    addartist,
    SearchInArtists,
    artist,
    GetArtistById,
    GetArtistObjectArray,
    getFollowedArtists,
    unFollowArtist,
    getUsersFollowingArtists

}

