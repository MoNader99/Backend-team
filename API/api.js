/////////////////////////// Ahmed /////////////////////////////////////////

/**
 * Get recently played tracks
 * -------------------------------------
 * @api {get} /tracks/recentlyplayed   RecentlyPlayedTracks
 * @apiName RecentlyPlayed
 * @apiGroup Tracks
 *
 * @apiHeader {string} x-auth     (UserToken)Only an User who has a verified account can get the last 5 tracks he/she played
 *
 * @apiSuccess 302                     [The response of the sucess case is an array of the last 5 played songs ]
 * @apiSuccessExample {JSON} Success-Response:
 * [ 
 *       {
 *           "__v" : 0,
 *           "trackPath" : "2Scratch - SUPERLIFE (feat. Lox Chatterbox).mp3",
 *           "genre" : "R&B",
 *           "trackName" : "Super Life",
 *           "artistId" : "5ea225ded6322b2846bf0e1d",
 *           "_id" : ObjectId("5ea225ded6322b2846bf0e30"),
 *           "type" : "Single",
 *           "numberOfTimesPlayed" : 1,
 *           "imagePath" : "Superlife42011663_800_800.jpg",
 *           "likes" : 12
 *       }, 
 *       {
 *           "__v" : 0,
 *           "trackPath" : "Youm Talat-Amr Diab-seeds.mp3",
 *           "genre" : "Arabic",
 *           "trackName" : "Youm Talat",
 *           "artistId" : "5ea225ded6322b2846bf0e1a",
 *           "_id" : ObjectId("5ea225ded6322b2846bf0e2a"),
 *           "type" : "Album",
 *           "numberOfTimesPlayed" : 0,
 *           "imagePath" : "default.jpeg",
 *           "likes" : 20
 *       }, 
 *       {
 *           "__v" : 0,
 *           "trackPath" : "When I'm Gone-Eminem-seeds.mp3",
 *           "genre" : "Rap",
 *           "trackName" : "When I'm Gone",
 *           "artistId" : "5ea225ded6322b2846bf0e19",
 *           "_id" : ObjectId("5ea225ded6322b2846bf0e2b"),
 *           "type" : "Single",
 *           "numberOfTimesPlayed" : 0,
 *           "imagePath" : "When_I'm_Gone_(Eminem_song).jpg",
 *           "likes" : 10
 *       }, 
 *       {
 *           "__v" : 0,
 *           "trackPath" : "Way Down We Go.Kaleowith Lyrics ..mp3",
 *           "genre" : "Alternative Rock",
 *           "trackName" : "Way Down We Go",
 *           "artistId" : "5ea225ded6322b2846bf0e1b",
 *           "_id" : ObjectId("5ea225ded6322b2846bf0e2c"),
 *           "type" : "Single",
 *           "numberOfTimesPlayed" : 0,
 *           "imagePath" : "KaleoWayDownWeGo.jpg",
 *           "likes" : 10
 *       }
 *   ],
 *
 * @apiError  404                    [The user didnot play any tracks ]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 404 No access
 *     {
 *        "You haven't played any tracks yet"
 *     }
 *
 *
 * @apiError  401                      [Cannot get last 5 played tracks without auth token]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 401 No access
 *     {
 *        "Unauthorized Access"
 *     }
 *
 * @apiError  404                      [If there is no user]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 404 No access
 *     {
 *        "User not found"
 *     }
 *
 *
 *
 *
 *
 */


/**
 * Get Artists top songs
 * -------------------------------------
 * @api {get} /tracks/top/EndPointIsNotFinal              ArtistTopTracks
 * @apiName TopTracks
 * @apiGroup Users
 *
 * @apiHeader {string} x-auth    (UserToken)Only a User who has a verified account can get top 5 tracks of an artist
 * @apiHeader {string} artistId    ID of the artist to get his/her top 5 tracks 
 * @apiSuccess 302                     [The response of the sucess case is the track info , the actual track will not be sent]
 * @apiSuccessExample {JSON} Success-Response:
 *     HTTP/1.1 302
 *     {
            Array of 5 tracks including the track info
            [{
                trackName:
                trackImage;
                duration of the track
                imageName of the track
                genre of thr track(if needed)
                wether if the track is single or in an album(to be introduced later in the database)
                

            },{
                same as above for track2
            },{
                same as above to track 3
            },{
                same as above to track 4
            },{
                same as above to track 5 
            }] 
 *     }
 *
 * @apiError  404                    [The artist did not release any tracks ]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 404 No access
 *     {
 *       "error": "The artist did not release any tracks"
 *     }
 * 
 * @apiError  400                    [The artist id is not passed ]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 400 No access
 *     {
 *       "error": "Missing artist Id"
 *     }
 *
 *
 * @apiError  401                      [Cannot get last top 5 tracks of an artist without auth token]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 401 No access
 *     {
 *       "error": "Unauthorized Access"
 *     }
 *
 *
 *
 *
 *
 *
 *
 */


/**
 * AddTrack
 * ---------------------
 *
 * @api {post} /tracks/single               Add Track
 * @apiName AddTrack
 * @apiGroup Tracks
 *
 * @apiHeader {string} x-auth    (ArtistToken)Only an Artist who has a verified account can add a track 
 * 
 * @apiParam {String}      trackName              Track name. (Obligatory) sent as multipart data 
 * @apiParam {String}      genre              each track has only 1 genre. (Obligatory) sent as multipart data 
 * @apiParam {file}        track              the audio track the artist wants to upload sent as multipart data 
 *
 * @apiSuccess 201                      [The response of the sucess case is the created track object]
 *
 * @apiSuccessExample {JSON} Success-Response:
 *     HTTP/1.1 201 OK
 *    
 * {
 *   "__v": 0,
 *   "artistId": "5e9cb30adf88aea050c0778a",
 *   "trackName": "Amaro",
 *   "genre": "Arabic",
 *   "trackPath": "Amaro--5e9cb30adf88aea050c0778a.mp3",
 *   "_id": "5e9cbdb92728b58c0f310d13",
 *  "type": "Single",
 *   "imagePath": "default.jpeg",
 *   "likes": 0
 *  }
 *
 *
 *
 * @apiError  401                      [Cannot upload the track without auth token]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 401 No access
 *     {
 *       "error": "Unauthorized Access"
 *     }
 *
 * @apiError  400                     [Cannot upload the track without track name]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 400 No access
 *     {
 *       "error": "Missing trackName"
 *     }
 *
 * @apiError  400                     [Cannot upload the track without the track (audio) file]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 400 No access
 *     {
 *       "error": "Please upload a track"
 *     }
 * 
 * @apiError  400                     [Cannot upload a track file longer than 10 minutes (15052800 bytes)]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 400 No access
 *     {
 *       "error": "Track is above limit size"
 *     }
 *
 *
 * @apiError  400                     [Cannot upload the track without the track genre]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 400 No access
 *     {
 *       "error": "Missing genre"
 *     }
 *
 * @apiError  409                    [The artist is trying to add a new track with the same name of one of his tracks (the same artist cannot have 2 tracks with the same exact name)]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 409 No access
 *     {
 *       "error": "Cannot create 2 Tracks with the same name (trackName) for the same artist"
 *     }
 *
 * @apiError  500                  [wehter there is a problem in creating or saving the track (unlikely to happen)]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 500 No access
 *     {
 *       "error": "Could not add track (trackName)"
 *     }
 */


//SETRAM A TRACK
/**
 * StreamTrack
 * ---------------------
 *
 * @api {get} /tracks/stream               Stream a single track
 * @apiName Streaming
 * @apiGroup Tracks
 *
 * @apiHeader {string} x-auth    (User Token)Only an user who has a verified account can play a track
 * @apiHeader {string} trackId    Id of the track the user wants to listen to
 * 
 *@apiSuccess 201                      [Explanation of wht is going to happen]
 *
 * @apiSuccessExample {JSON} Success-Response:
 *     The connection is going to remain open to send chuncks of the track 4000 bytes after each other
 *     The user is eligible to pause, fast foward or go backwards while playing a song
 *
 * 
 * @apiError  401                      [Cannot play a track without auth token]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 401 No access
 *     {
 *       "error": "Unauthorized Access"
 *     }
 *
 * @apiError  400                     [Cannot play the track without track ID]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 400 No access
 *     {
 *       "error": "Missing track ID"
 *     }
 *
 * @apiError  404                    [Cannot play a track if the track id is wrong or the track is deleted by the artist]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 404 No access
 *     {
 *       "error": "Track not found. Maybe deleted by the artist"
 *     }
 * 
 * @apiError  404                   [Cannot play a track with invalid track ID]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 404 No access
 *     {
 *       "error": "Invalid track ID"
 *     }
 *
 */




 /**
 * DeleteTrack
 * ---------------------
 *
 * @api {delete} /tracks             Delete Track
 * @apiName DeleteTrack
 * @apiGroup Tracks
 *
 * @apiHeader {string} x-auth    (ArtistToken)Only an Artist who has a verified account can delete his tracks
 * @apiHeader {JSON}   Content-Type     The content of the request body in JSON format.
 *
 * @apiParam {string}    trackName           the name of the track that the artist wants to delete(an artist cannot have 2 tracks with the same name)
 *
 * @apiSuccess 200                     [the track has been deleted successfully]
 *
 * @apiSuccessExample {JSON} Success-Response:
 *     HTTP/1.1 200
 *    {
 *      "Track (trackName) was deleted successfully"
 *    }
 *
 * @apiError  400                      [Cannot delete without the track name]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 400 No access
 *     {
 *       "error": "Pass the track name to delete"
 *     }
 *
 * @apiError  404                     [the artist is not the owner of this track or track does not exist]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 404 No access
 *     {
 *       "error": "Track not found to be deleted"
 *     }
 *
 * @apiError  401                      [Cannot delete the track without auth token]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 401 No access
 *     {
 *       "error": "Unauthorized Access"
 *     }
 *
 * @apiError  500                     [Cannot delete the track due to internal server error (Unlikely)]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 500 No access
 *     {
 *       "error": "Could not delete track "
 *     }
 *
 *
 */




//DELETE TRACK FROM PLAYLIST
/**
 * DeleteTrack from playlist
 * ---------------------
 *
 * @api {delete} /playlists/tracks            Delete Track from playlist
 * @apiName DeleteTrackFromPlaylist
 * @apiGroup Playlists
 *
 * @apiHeader {string} x-auth    (UserToken)Only a user  who has a verified account can delete a track from his playlist
 * @apiHeader {JSON}   Content-Type     The content of the request body in JSON format.
 *
 * @apiParam {string}    playlistName           the name of the playlist he want to delete a track from
 * @apiParam {string}     trackID                the track id he wants to remove from his/her playlist
 *
 * @apiSuccess 200                      [the track has been deleted successfully]
 *
 * @apiSuccessExample {JSON} Success-Response:
 *     HTTP/1.1 200
 *    {
 *      "Track is successfully deleted from playlist"
 *    }
 *
 * @apiError  400                      [playlist name must be passed]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 400 No access
 *     {
 *       "error": "Pass the playlistname that you want to delete a track from"
 *     }
 *
 * @apiError  400                      [trackId must be passed]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 400 No access
 *     {
 *       "error": "Pass the trackId that you want to delete"
 *     }
 *
 * @apiError  404                      [the passed track id is not a valid track]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 404 No access
 *     {
 *       "error": "Invalid Track Id"
 *     }
 *
 * @apiError  404                      [the passed playlist name doesnot belong to this user]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 404 No access
 *     {
 *       "error": "Playlist not found"
 *     }
 *
 * @apiError  400                     [the passed track is not in the playlist]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 400 No access
 *     {
 *       "error": "Track is not in the playlist"
 *     }
 *
 * @apiError  401                      [Cannot delete the track without auth token]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 401 No access
 *     {
 *       "error": "Unauthorized Access"
 *     }
 *
 * @apiError  500                     [Cannot delete the track due to internal server error (Unlikely)]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 500 No access
 *     {
 *       "error": "Could not remove the track from the playlist"
 *     }
 *
 */


 //DELETE PLAYLIST
/**
 * Delete playlist
 * ---------------------
 *
 * @api {delete} /playlists            Delete playlist
 * @apiName DeletePlaylist
 * @apiGroup Playlists
 *
 * @apiHeader {string} x-auth   (UserToken)Only a user  who has a verified account can delete his/her playlist
 * @apiHeader {JSON}   Content-Type     The content of the request body in JSON format.
 *
 * @apiParam {string}    playlistName           the name of the playlist he want to delete a track from
 *
 * @apiSuccess 200                      [the playlist has been deleted successfully]
 *
 * @apiSuccessExample {JSON} Success-Response:
 *     HTTP/1.1 200
 *    {
 *      "Playlist deleted succsesfully"
 *    }
 *
 * @apiError  400                      [playlist name must be passed]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 400 No access
 *     {
 *       "error": "Pass the playlistname that you want to delete"
 *     }
 *
 * @apiError  404                      [the passed playlist name doesnot belong to this user]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 404 No access
 *     {
 *       "error": "No playlist found to delete"
 *     }
 *
 * @apiError  401                      [Cannot delete the playlist without auth token]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 401 No access
 *     {
 *       "error": "Unauthorized Access"
 *     }
 *
 * @apiError  500                     [Cannot delete the playlist due to internal server error (Unlikely)]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 500 No access
 *     {
 *       "error": "Could not delete playlist"
 *     }
 *
 */

 //CREATE PLAYLIST
/**
 * Create Playlist
 * ---------------------
 *
 * @api {post} /playlists               Create a new playlist
 * @apiName CreatePlaylist
 * @apiGroup Playlists
 *
 * @apiHeader {string} x-auth    (UserToken)Only an User who has a verified account can create a playlist
 * @apiHeader {JSON}   Content-Type     The content of the request body in JSON format.
 *
 * @apiParam {string}      playlistName      Playlist name. (Obligatory)
 * @apiParam {Boolean}     privacy           if the playlist is public or private (OPTIONAL default value is false)
 *
 * @apiSuccess 201                      [The response of the sucess case is the created playlist object]
 *
 * @apiSuccessExample {JSON} Success-Response:
 *     HTTP/1.1 201 OK
 *    {
 *         "_id" : ObjectId("5e7511fa1a2c59902efa5544"),
 *         "userId" : "5e7511fa1a2c59902efa552a",
 *         "playlistName" : "RecyleBin",
 *         "imagePath" : defaultimage.png
 *         "tracks" : [],
 *        "privacy" : false,
 *         "__v" : 0
 *
 *    }
 *
 *
 *
 * @apiError  401                      [Cannot create playlist without auth token]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 401 No access
 *     {
 *       "error": "Unauthorized Access"
 *     }
 *
 * @apiError  400                     [user cannot have 2 playlists with the same name]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 400 No access
 *     {
 *       "error": "Cannot create 2 playlists with the same name"
 *     }
 *
 * @apiError  500                  [wether there is a problem in creating or saving the playlist (unlikely to happen)]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 500 No access
 *     {
 *       "error": "Could not create playlist"
 *     }
 *
 *
 * @apiError  400                     [playlist name is missing (Obligatory filed)]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 400 No access
 *     {
 *       "error": "Coult not create playlist due to missing info"
 *     }
 *
 *
 *  */



/**
 * Get cover image of a playlist
 * -------------------------------------
 * @api {get} /playlists/images     Get a playlist cover image
 * @apiName GetPlaylistCoverImage
 * @apiGroup Playlists
 *
 * @apiHeader {string} x-auth    (UserToken)Only an User who has a verified account can get the image of a playlist
 * @apiHeader {string}   playlistName    The playlist that you want to get its image
 *
 *
 *
 * @apiSuccess 302                     [The response of the sucess case is the url to the image file]
 * @apiSuccessExample {JSON} Success-Response:
 *     HTTP/1.1 302
 *     {
           default.png
 *     }
 *
 * @apiError  400                     [playlist name is missing (Obligatory filed)]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 400 No access
 *     {
 *       "error": "Pass the playlistname to get it's image"
 *     }
 *
 * @apiError  404                    [The passed playlist name doesnot belong to the user]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 404 No access
 *     {
 *       "error": "Playlist does not exist"
 *     }
 *
 * @apiError  500                  [internal server error (Unlikely)]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 500 No access
 *     {
 *       "error": "Could not send the image"
 *     }
 *
 * @apiError  401                      [Cannot create playlist without auth token]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 401 No access
 *     {
 *       "error": "Unauthorized Access"
 *     }
 *
 *
 *
 *
 *
 *
 *
 */



/**
 * EDIT PROFILE PICTURE OF THE USER
 * -------------------------------------
 * @api {post} /users/profilepicture   Edit profile picture of the user
 * @apiName Edit profile picture of the user
 * @apiGroup Users
 *
 * @apiHeader {string} x-auth    (UserToken)Only an User who has a verified account can edit his/her profile picture
 * @apiHeader {JSON}   Content-Type     The content of the request body in JSON format.
 *
 *
 * @apiParam {file} photo      sent as file in in form-data
 *
 * @apiSuccess 200                     [The response of the sucess case is a message]
 * @apiSuccessExample {JSON} Success-Response:
 *     HTTP/1.1 200
 *     {
 *            "Image changed successfully"
 *     }
 *
 * @apiError  400                  [no image file]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 404 No access
 *     {
 *       "error": "Please Upload an image"
 *     }
 *
 * @apiError  400                 [file that is not an image]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 400 No access
 *     {
 *       "error": Please Upload an image
 *     }
 *
 * @apiError  401                      [Cannot edit pp without auth token]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 401 No access
 *     {
 *       "error": "Unauthorized Access"
 *     }
 *
 *
 *
 */

/**
* EDIT PROFILE PICTURE OF THE ARTIST
* -------------------------------------
* @api {post} /artists/profilepicture   Edit profile picture of the artist
* @apiName Edit profile picture of the artist
* @apiGroup Artists
*
* @apiHeader {string} x-auth    (ArtistToken)Only an artist who has a verified account can edit his/her profile picture
* @apiHeader {JSON}   Content-Type     The content of the request body in JSON format.
*
*
* @apiParam {file} photo      sent as file in in form-data
*
* @apiSuccess 200                     [The response of the sucess case is a message]
* @apiSuccessExample {JSON} Success-Response:
*     HTTP/1.1 200
*     {
*            "Image changed successfully"
*     }
*
* @apiError  400                  [no image file]
* @apiErrorExample {JSON} Error-Response:
*     HTTP/1.1 404 No access
*     {
*       "error": "Please Upload an image"
*     }
*
* @apiError  400                 [file that is not an image]
* @apiErrorExample {JSON} Error-Response:
*     HTTP/1.1 400 No access
*     {
*       "error": Please Upload an image
*     }
*
* @apiError  401                      [Cannot edit pp without auth token]
* @apiErrorExample {JSON} Error-Response:
*     HTTP/1.1 401 No access
*     {
*       "error": "Unauthorized Access"
*     }
*
*
*
*/


/**
 * EDIT TRACK COVER IMAGE
 * -------------------------------------
 * @api {post} /tracks/coverimage   Edit cover image of the track
 * @apiName Edit Track cover image
 * @apiGroup Tracks
 *
 * @apiHeader {string} x-auth    (artistToken)Only an artist who has a verified account can edit his/her track cover image 
 * @apiHeader {string} trackName    Name of the track the artist wants to edit it's cover image
 *
 * @apiParam {file} photo      sent as file in in form-data
 *
 * @apiSuccess 200                     [The response of the sucess case is a message]
 * @apiSuccessExample {JSON} Success-Response:
 *     HTTP/1.1 200
 *     {
 *            "Track Image changed successfully"
 *     }
 *
 * @apiError  400                  [no image file]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 400 No access
 *     {
 *       "error": "Please Upload an image"
 *     }
 *
 * @apiError  400                 [file that is not an image]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 400 No access
 *     {
 *       "error": Please Upload an image
 *     }
 * @apiError  400                 [Missing track Name]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 400 No access
 *     {
 *       "error": "Missing track Name"
 *     }
 * 
 * @apiError  404                [Track doesnot belong to the user]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 404 No access
 *     {
 *       "error": "Track is not found"
 *     }
 * @apiError  401                      [Cannot change track cover image without auth token]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 401 No access
 *     {
 *       "error": "Unauthorized Access"
 *     }
 *
 *
 *
 */

/**
 * EDIT ALBUM COVER IMAGE
 * -------------------------------------
 * @api {post} /album/coverimage   Edit cover image of the album
 * @apiName Edit Album cover image
 * @apiGroup Album
 *
 * @apiHeader {string} x-auth    (artistToken)Only an artist who has a verified account can edit his/her album cover image 
 * @apiHeader {string} albumId    Id of the album to be edited
 *
 * @apiParam {file} photo      sent as file in in form-data
 *
 * @apiSuccess 200                     [The response of the sucess case is a message]
 * @apiSuccessExample {JSON} Success-Response:
 *     HTTP/1.1 200
 *     {
 *            "Album Image changed successfully"
 *     }
 *
 * @apiError  400                  [no image file]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 400 No access
 *     {
 *       "error": "Please Upload an image"
 *     }
 *
 * @apiError  400                 [file that is not an image]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 400 No access
 *     {
 *       "error": Please Upload an image
 *     }
 * @apiError  400                 [Missing Album Id]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 400 No access
 *     {
 *       "error": "Missing Album Id"
 *     }
 * 
 * @apiError  404                [Album is not found]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 404 No access
 *     {
 *       "error": "Album is not found.May be removed by the artist"
 *     }
 * 
 * @apiError  404                [Invalid Album ID]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 404 No access
 *     {
 *       "error": "Invalid Album ID"
 *     }
 * @apiError  401                      [Cannot change track cover image without auth token]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 401 No access
 *     {
 *       "error": "Unauthorized Access"
 *     }
 *
 *
 *
 */








//GET ARTIST RELATED ARTISTS
 /**
 * Get artist related artists
 * -------------------------------------
 * @api {get} /users/artists/related    Get Artists who sing at least 1 same genre as the passed artist
 * @apiName GetArtistRelatedArtists
 * @apiGroup Users
 *
 * @apiHeader {string} x-auth    Front end token
 * @apiHeader {string}   artistId     Id of the artist the  user wants to get his/her related artists   
 *
 * @apiSuccess 302                     [The response of the sucess case is an array of artists]
 * @apiSuccessExample {JSON} Success-Response:
 *     HTTP/1.1 302
 * {
 *        [
 *   {
 *       "_id": "5e7511fa1a2c59902efa552d",
 *       "password": "5080",
 *       "artistName": "Eminem",
 *       "about": "Marshall Bruce Mathers III (born October 17, 1972), known professionally as Eminem\n     (/ˌɛmɪˈnɛm/; often stylized as EMINƎM), is an American rapper, songwriter, record producer, \n     record executive and actor. He is one of the most successful musical artists of the 21st century.",
 *       "__v": 0,
 *       "isActive": false,
 *       "rating": 4.6,
 *       "genres": [
 *           "Trap",
 *           "Jazz",
 *           "pop",
 *           "Rap"
 *       ]
 *   },
 *   {
 *       "_id": "5e7511fa1a2c59902efa552c",
 *       "email": "beeka70@hotmail.com",
 *       "password": "$2b$10$sqP.uu/YJzYg0vErxw24TeMe8eeUzPtWCrSST8gGn9wMxYNQxqGNS",
 *       "artistName": "HAmo Beeka",
 *       "about": "Adele Laurie Blue Adkins (born May 5, 1988) is a British singer-songwriter \n    who has sold millions of albums worldwide and won a total of 15 Grammys as well as an Oscar.\n     Adele's first two albums, 19 and 21, earned her critical praise and a level of\n      commercial success unsurpassed among her peers.",
 *       "__v": 0,
 *       "isActive": false,
 *       "rating": -1,
 *       "genres": [
 *           "sha3by",
 *           "R&B"
 *       ]
 *   }
 *  ]
 *
 * }
 * @apiError  401                      [Cannot get related artists without auth token]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 401 No access
 *     {
 *       "error": "Token is not valid"
 *     }
 * @apiError  404                      [the artist id is not found in the DB]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 404 No access
 *     {
 *       "error": "Id not found"
 *     }
 * @apiError  404
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 404 No access
 *     {
 *       "error": "Invalid Id"
 *     }
 * @apiError  400                   [the artist id is not passed]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 400 No access
 *     {
 *       "error": "Send the artist ID"
 *     }
 */
////////////////////////////////Monica/////////////////////////////////////////////////
 /**
 * forgot password
 * ----------------------
 * @api {post} /users/forgot     forget password      [Request to send email after forgetting password]
 * @apiName ForgotPasswordRequest
 * @apiGroup User privacy
 *
 * @apiParam {string} email       in json form
 * @apiParamExample {json} Request-Example:
 *     {
 *       "email": "abc@abc.com"
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message" :"Email Sent Successfully"
 *     }
 *
 * @apiError  500              [Email Cannot BeSent  A problem while sending email]
  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 serverError
 *     {
 *       "message":"Sending Failed"
 *     }
* @apiError  404       [email of the user not found ]
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 not found
 *     {
 *        "message":"Email not found"
 *     }
 */



 /**
 * Reset password
 * ----------------------
 * @api {patch} /users/reset      reset Password  [Request to reset password after triggering forget password]
 * @apiName ResetRequest
 * @apiGroup User privacy
 *
 * @apiParam {string} token          should be passed in query
 * @apiParam {string}  newPassword    should be passed in body in json form
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "message": "Password has been reset successfully""
 *     }
 *
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 unauthorized
 *     {
 *       "message": "Reset Failed""
 *     }
 */


 //REGULAR ACCOUNT
/**
 * @api {patch} /users/regular     return to regular    [ User wants to unsubscribe from premium features]
 * @apiName WithdrawPremiumServies
 * @apiGroup Users
 * @apiHeader {string} x-auth        the token Only users
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Your account has been changed to regular account"
 *     }
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200
 *     {
 *       "message":"you are not premium , you already have a regular account "
 *     }
 *
 * @apiError 401            [ authentication failed]
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 401
 *     {
 *       "message":"authentication Failed" "
 *     }
 *
 */




 //REQUEST FOR A PREMIUM ACCOUNT
/**
 * @api {get} /users/premium       request for a premium account   [ Send a confirmation mail to be a premium user]
 * @apiName Join Premium Request
 * @apiGroup Users
 * @apiHeader {string} x-auth            token Only users can request to premium
 *
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *
 *       "message": "confirmation request has been sent, You will be a premium user soon"
 *     }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *
 *       "message": "You are already a premium user.Thanks for that"
 *     }
 *
 *
 * @apiError 401  authentication failed
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 401
 *     {
 *       "message":"authentication Failed" "
 *     }
 *
 * @apiError 500       EmailCannotBeSent  A problem while sending email
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 server Error
 *     {
 *       "message":"error,failed to send"
 *     }
 *
 *
 * 
 * 
 * 
 * * @apiError 401  authentication failed
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 401
 *     {
 *       "message":"authentication Failed or invalid token "
 *     }
 *
*/


//CONFIRMATION OF A PREMIUM ACCOUNT
/**
 * @api {patch} /users/confirmPremium    confirmation of premium account [ User is confirmed to be a premium user]
 * @apiName Acceptance of Premium Request
 * @apiGroup Users
 * @apiParam {String} token              should be passed in query of url the token that was sent in the link sent to the user's email
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
*           "message" : "Email confirmed successfully,Welcome To Premium Life!"
 *
 *
 *
 *     }
 *
 * @apiError 401  authentication failed
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 401
 *     {
 *       "message":"authentication Failed or invalid token"
 *     }
 *
 *@apiError 404    user not found
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 404
 *     {
 *       "message":"not found"
 *     }
 *
 *
 *
 *
 */


 /**
   * GetSeveralTracks
  * ---------------------
  *
  * @api {post} /tracks               Get several Tracks
  * @apiName Get Several Tracks
  * @apiGroup Tracks
  *
  *
  * @apiParam {string[]}    id          An array of comma separated tracks Ids. Maximum 10 IDs.
  *
  * @apiSuccess {object[]}     tracks          a set objects of type tracks in JSON format with status code 200
  *
  * * @apiSuccessExample {JSON} Success-Response:
  *     HTTP/1.1 200 OK
 {
     "tracks": [
         {
             "_id": "5e9d5ba78d6d7148a8860da7",
             "trackName": "When I'm Gone",
             "artistName": "Eminem",
             "albumName": "When I'm Gone",
             "type": "Single",
             "genre": "Rap",
             "numberOfTimesPlayed": 0,
             "likes": 12,
             "trackPath": "When I'm Gone-Eminem-seeds.mp3",
             "imagePath": "default.jpeg"
         },
         {
             "_id": "5e9d5ba78d6d7148a8860da5",
             "trackName": "Tamaly m3ak",
             "artistName": "Amr Diab",
             "albumName": "El Leila",
             "type": "Album",
             "genre": "Arabic",
             "numberOfTimesPlayed": 0,
             "likes": 10,
             "trackPath": "Tamaly m3ak-Amr Diab-seeds.mp3",
             "imagePath": "default.jpeg"
         },
          
         null  // if you send an id that is not in the database
               // 
     ]
 }
  *
  *
  * @apiError  400                      [empty array of ids]
  *  @apiErrorExample {JSON} Error-Response:
  *     HTTP/1.1 400 Bad Request
  *     {
  *       "message":"empty array of ids"
  *     }
  * 
  *
  * @apiError  404                      [invalid id]
  *  @apiErrorExample {JSON} Error-Response:
  *     HTTP/1.1 404 Not Found
  *     {
  *       "message" : "invalid id"
  *     }
  *
  *  @apiError  403
  *  @apiErrorExample {JSON} Error-Response:
  *     HTTP/1.1 403 forbidden
  *     {
  *       "message" : "max 10 Ids"
  *     }
  *
  *
  *
  */
 
/**
* AddTracksToAPlaylist
 * ---------------------
 *
 * @api {post} /tracks/:playlistId/playlists               Add tracks to a playlist
 * @apiName AddTracksToAPlaylist
 * @apiGroup Playlists
 *
 * @apiHeader {string}  x-auth
 *
 *@apiParam {string}  playlistId
 *
 * @apiParam {string[]}   trackId            a list of tracks ids to be passed in the body parameters
 * @apiSuccess 200                      [tracks has been successfully added to playlist]
 *   @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *
 *       "message": "tracks added successfully"
 *     }
 *
 *
 * *@apiError  403                      [Forbidden because you crossed the limiting number of tracks in a playlist which is 10]
 *  @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *        "message":  "Forbidden because you crossed the limiting number of tracks in a playlist which is 1000"
 *     }
 *
 * @apiError 401   [authentication failed]
 *@apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 401
 *     {
 *        "message":  "authentication failed"
 *     }
 *
 *
 *
 *
 * @apiError 404     [playlist or tracks not found]
*@apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 404
 *     {
 *        "message":  "playlist not found"
 *     }
 *
 * 
 * 
*@apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 404
 *     {
 *        "message":  "tracks not found"
 *     }
 *
 */

/**
 * @api {get} /artists/homepage/popular    Get popular Artists for homepage
 * @apiName GetPopularArtists
 * @apiGroup Artists
            
 *
 * @apiSuccess {object[]}     artists     An array of Artist objects containing the full details of each  Artist.
 *
 * @apiSuccessExample {JSON} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "artists": [
        {
            "_id": "5e88ce838d92547020e1a652",
            "artistName": "Eminem",
            "genres": [
                "Trap",
                "Jazz",
                "pop",
                "Rap"
            ],
            "about": "Marshall Bruce Mathers III (born October 17, 1972), known professionally as Eminem\n     (/ˌɛmɪˈnɛm/; often stylized as EMINƎM), is an American rapper, songwriter, record producer,\n     record executive and actor. He is one of the most successful musical artists of the 21st century.",
            "rating": 4.6,
            "imagePath": "./Pictures/defaultuser.png"
        },
        {
            "_id": "5e88ce838d92547020e1a650",
            "artistName": "Adele",
            "genres": [
                "pop",
                "R&B"
            ],
            "about": "Adele Laurie Blue Adkins (born May 5, 1988) is a British singer-songwriter\n    who has sold millions of albums worldwide and won a total of 15 Grammys as well as an Oscar.\n     Adele's first two albums, 19 and 21, earned her critical praise and a level of\n      commercial success unsurpassed among her peers.",
            "rating": 4,
            "imagePath": "./Pictures/Adele.png"
        }
    ]
}
 *
 *
 *
 */




/** 
* @api {post} /artists Get several Artists
 * @apiName GetSeveralArtists
 * @apiGroup Artists
 *
 * @apiHeader {string}  x-auth          Authorization Required. A valid access token.
 * 
 * @apiParam {string[]}   id               ids array of each Artist's unique ID.
 *
 * @apiSuccess {object[]} artists           An array of Artist objects containing the full details of each  Artist.
 *
 * @apiSuccessExample {JSON} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *     "artists": [
        {
            "artistName": "Adele",
            "genres": [
                "pop",
                "R&B"
            ],
            "about": "Adele Laurie Blue Adkins (born May 5, 1988) is a British singer-songwriter\n    who has sold millions of albums worldwide and won a total of 15 Grammys as well as an Oscar.\n     Adele's first two albums, 19 and 21, earned her critical praise and a level of\n      commercial success unsurpassed among her peers.",
            "rating": 4
        },
        {
            "artistName": "HAmo Beeka",
            "genres": [
                "sha3by",
                "R&B"
            ],
            "about": "Adele Laurie Blue Adkins (born May 5, 1988) is a British singer-songwriter\n    who has sold millions of albums worldwide and won a total of 15 Grammys as well as an Oscar.\n     Adele's first two albums, 19 and 21, earned her critical praise and a level of\n      commercial success unsurpassed among her peers.",
            "rating": -1
        },
        {
            "artistName": "Eminem",
            "genres": [
                "Trap",
                "Jazz",
                "pop",
                "Rap"
            ],
            "about": "Marshall Bruce Mathers III (born October 17, 1972), known professionally as Eminem\n     (/ˌɛmɪˈnɛm/; often stylized as EMINƎM), is an American rapper, songwriter, record producer,\n     record executive and actor. He is one of the most successful musical artists of the 21st century.",
            "rating": 4.6
        }
    ]
}
 * @apiError 401                 [Authentication failed,The token sent didn't belong to any user]
 *
 * @apiErrorExample {json} AuthError-Response:
 *     HTTP/1.1 401  Authentication Failure
 *     {
 *        "message":"authentication failed"
 *     }
 *
 * 
 * @apiError 400  [exceeded 50 ids]
 *
 * @apiErrorExample {json}      BadRequest-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message":"maximum 50 ids"
 *     }
 *
 * 
 * 
 *     @apiError  403  [invalid id]
 *
 * @apiErrorExample {json}       forbidden-Response:
 *     HTTP/1.1 403 forbidden
 *     {
 *       "message":"invalid id"
 *     }
 *
 * @apiError 404     [artist not found]
*@apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 404
 *     {
 *        "message":  "artist not found"
 *     }
 * 
 * 
 * 
 *
 */




 ///////////////////////Aya Magdy/////////////////////////////

 ///////////////////////Aya Magdy/////////////////////////////

 //Sign up user
 /**
 * @api {post} api/users/signup   Create a new user
 * @apiName SignUp Request for Users
 * @apiGroup Users
 *
 * @apiParam {String} userName      Unique name of the user
 * @apiParam {String} email         email of the user
 * @apiParam {String} password      password of the user
 * @apiParam  {Boolean} isPremium   default is false
 * @apiParam  {string} day      birthdate of the user-day: 2 digits
 * @apiParam  {string} month      birthdate of the user-month: 2 digits
 * @apiParam  {string} year      birthdate of the user-year: 2 digits
 * @apiParam  {Srting} gender       gender of the user-Limited to 'M' or 'F'
 *
 * @apiSuccess  (200) User added Successfully as inActive. Waiting for Email Confirmation
 * @apiSuccessExample {string} Success-Response:
 *     HTTP/1.1 200 OK
 *{
 *        "User added Successfully as inActive. Waiting for Email Confirmation "
 *}
 * @apiError (409)  Conflict. the user already exists: duplicate userName or email
 * @apiError (400) Bad request.some/all parameters are missing or sent in an invalid form.
 * @apiErrorExample {string} Conflict Error-Response:
 *    HTTP/1.1 409
 *{
 *       "UserName and/or Email already exists "
 *}
 * @apiErrorExample {string} Bad request Error-Response:
 *    HTTP/1.1 400
 *{
 *       "Missing some fields in the request body"
 *}
 */






//GET User Profile By ID
 /**
 * GET User Profile By ID
 * -------------------------------------
 * @api {get} /users/:id         GET User Profile By ID      
 * @apiName GetUserProfileByID
 * @apiGroup Users
 *
 * @apiHeader {string}  x-auth          token for frontend to send the response
 *
 * @apiParam {string} userId           Id of the user
 *
 * @apiSuccess 302                     [The response of the success case is a user object]
 * @apiSuccessExample {JSON} Success-Response:
 *     HTTP/1.1 302
 * {
 *     
 *      "likedAlbums": ["5e8a701954fe752c1498f729",
 *               "5e8a701954fe752c1498f72a"]
 *      "likedTracks": ["5e8a701954fe752c1498f72c",
 *               "5e8a701954fe752c1498f72d"] 
 *
 * }
 * @apiError  404   Not found                   [the user id is not found ]
 * @apiErrorExample {string} Error-Response:
 *     HTTP/1.1 404 Not found 
 *     {
 *       "Id not found"
 *     }
 * @apiError 401   Unauthorized               [authentication failed]
 * @apiErrorExample {string} Error-Response:
 *     HTTP/1.1 401   Unauthorized
 *     {
 *        "Token is Empty"
 *     }
 * 
 * @apiError 401   Unauthorized               [authentication failed]
 * @apiErrorExample {string} Error-Response:
 *     HTTP/1.1 401   Unauthorized 
 *     {
 *        "Token Invalid"
 *     }
 * 
 * 
 * 
 */






 //GET ALBUMS BY ARTIST
/**
* @api {get} /albums/byartist/:artistId  Get Albums by an artist
* @apiName Get Albums by an artist
* @apiGroup Album
*
* @apiHeader {string}  x-auth          Required
*
* @apiParam {string} artistId           Id of the artist
*
* @apiSuccess {object[]}  albums           array of objects of type album in JSON format with status code 200
* @apiSuccessExample {JSON} Success-Response:
*     HTTP/1.1 200
*
*       {
*  "ALBUMS":[ {
*       "_id": "5e89f2caaaa6bd3f481675f5",
*       "artistId": "5e89f2caaaa6bd3f481675eb",
*       "albumName": "25",
*       "__v": 0,
*       "likes": 1,
*       "rating": null,
*       "tracks": [
 *           "5e89f2caaaa6bd3f481675f0",
 *           "5e89f2caaaa6bd3f481675f1"
 *       ],
 *       "imagePath": "default.png"
 *   },
 * {
   *       "_id": "5e89f2caaaa6bd3f481675f5",
   *       "artistId": "5e89f2caaaa6bd3f481675eb",
   *       "albumName": "25",
   *       "__v": 0,
   *       "likes": 1,
   *       "rating": null,
   *       "tracks": [
     *           "5e89f2caaaa6bd3f481675f0",
     *           "5e89f2caaaa6bd3f481675f1"
     *       ],
     *       "imagePath": "default.png"
     *   }
     *]
     * }
* @apiError  404   Not found                   [the album id is not found ]
 * @apiErrorExample {string} Error-Response:
 *     HTTP/1.1 404 Not found
 *     {
 *       "Id not found"
 *     }
 *  @apiError 401   Unauthorized               [authentication failed]
 * @apiErrorExample {string} Error-Response:
 *     HTTP/1.1 401   Unauthorized
 *     {
 *        "Token is Empty"
 *     }
 *
 */



 //CONFIRMATION OF USER SIGNUP
 /**
  * @api {get} api/users/confirm/:code      SignUp Confrimation
  * @apiName SignUp Confirmed for user
  * @apiGroup Users
  *
  * @apiParam {String} code    user-specific code to activate his account
  *
  * @apiSuccess  (200) User was activated successfully
  * @apiSuccessExample {string} Success-Response:
  *     HTTP/1.1 200 OK
  *{
  *       "Email confirmed successfully!"
  *}
  * @apiError (404)  User not found.
  * @apiError (401) Unauthorized. Recieved a corrupted code.
  * @apiErrorExample {string} Unauthorized Error-Response:
  * HTTP/1.1 401 Unauthorized
  *{
  *      "userName and/or Email already exists "
  *}
  */



 //SIGNUP FOR THE ARTISTS
 /**
 * @api {post} api/artists/signup             Create a new artist
 * @apiName SignUp Request for artists
 * @apiGroup Artists
 *
 * @apiParam {String} artistName    Unique name of the artist
 * @apiParam {String} email         email of the artist
 * @apiParam {String} password      password of the artist
 * @apiParam  {string} day      birthdate of the artist-day: 2 digits
 * @apiParam  {string} month      birthdate of the artist-month: 2 digits
 * @apiParam  {string} year      birthdate of the artist-year: 2 digits
 * @apiParam  {Srting} gender       gender of the artist-Limited to 'M' or 'F'
 *
 * @apiSuccess  (200) Artist added Successfully as inActive. Waiting for Email Confirmation
 * @apiSuccessExample {string} Success-Response:
 *     HTTP/1.1 200 OK
 *{
 *        "Artist added Successfully as inActive. Waiting for Email Confirmation "
 *}
 * @apiError (409)  Conflict. the Artist already exists: duplicate artistName or email
 * @apiError (500) Internal Server Error
 * @apiErrorExample {string} Conflict Error-Response:
 *{
 *      "artistName and/or Email already exists "
 *}
 */



 //CONFIRMATION OF ARTIST SIGNUP
 /**
  * @api {get} api/artists/confirm/:code      SignUp Confrimation
  * @apiName SignUp Confirmed for artist
  * @apiGroup Artists
  *
  * @apiParam {String} code    artist-specific code to activate his account
  *
  * @apiSuccess  (200) artist was activated successfully
  * @apiSuccessExample {string} Success-Response:
  *     HTTP/1.1 200 OK
  *{
  *       "Email confirmed successfully!"
  *}
  * @apiError (404)  artist not found.
  * @apiError (401) Unauthorized. Recieved a corrupted code.
  * @apiErrorExample {string} Unauthorized Error-Response:
  * HTTP/1.1 401 Unauthorized
  *{
  *       "artistName and/or Email already exists "
  *
  *}
  */



 //edit user profile
 /**
  * @api {patch} /api/users/me/editprofile edit current user's profile
  * @apiName Edit Current User's Profile
  * @apiGroup Users
  *
  * @apiHeader (Header Fields) {string} Authorization Required. A valid access token.
  *
  * @apiParam (Body Parameters) {string} userName the name visible to othe users.
  * @apiParam  {string} day      birthdate of the user-day: 2 digits
  * @apiParam  {string} month      birthdate of the user-month: 2 digits
  * @apiParam  {string} year      birthdate of the user-year: 2 digits
  * @apiParam (Body Parameters) {string} gender user's gender 'M' or 'F'.
  *
  * @apiSuccessExample {string} Success-Response:
  *     HTTP/1.1 200 OK
  *   {
  *    "updated"
  *}
  *
  * @apiError (401) Authentication failed.
  * @apiError (404) user not found.
  * @apiError (400) Bad request. invalid body parameters such as birthDate or gender.
  * @apiError (403) Conflict. userName already exists
  *
  * @apiErrorExample {string} AuthError-Response:
  *     HTTP/1.1 401 Access denied
  *{
  *    "Authentication failed or invalied token."
  *}
  *
  */

//GET TRACKS BY ARTIST
  /**
  * ---------------------
  *
  * @api {Get} /tracks/byartist/:id   Get tracks by artist
  * @apiName GetTrack
  * @apiGroup Tracks
  *
  *
  * @apiParam {string}    id           the id of the artist
  *
  * @apiSuccess {object[]}  tracks           array of objects of type track in JSON format with status code 200
  *
  * @apiSuccessExample {JSON} Success-Response:
  *     HTTP/1.1 200 OK
  *      {
  *          "tracks": [{
         "rating": 10,
         "duration": 360000,
         "_id": "5e6b7dac91cb724878446635",
         "trackName": "Hello",
         "url": "cccc",
         "__v": 0
     },
     {
           "rating": 10,
           "duration": 360000,
           "_id": "5e6b7dac91cb724878446635",
           "trackName": "Hello",
           "url": "cccc",
           "__v": 0
       }]
  *      }
  *
  *
  *
  * @apiError  404                      [Track not found]
  *  @apiErrorExample {string} Error-Response:
  *     HTTP/1.1 404 Not Found
  *    {
  *   "Track not found"
  *     }
  *
  *
  *
  */



////////////////////////Aya Mahmoud //////////////////////

/**
* Login by user
 * ---------------------
 *
 * @api {post} api/users/login               login for user
 * @apiName User login
 * @apiGroup Users
 *
 *
 *@apiParam {string}  email
 *
 * @apiParam {string} password
 * @apiHeader {string}  x-auth       token for frontend to send the response
 * @apiParamExample {json} Request-Example:
 *     {
 *       "email": "ayamahmoudabdelfatah99@gmail.com",
 *       "password":"1234"
 *     }
 *@apiHeader (Response Header) {String} x-auth [token given for the logging in user]
 *
 * @apiError 401   [authentication failed]
 *@apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 401
 *     {
 *        "Either email or passwrod is incorrect"
 *     }
 *
 *
 * @apiError  403  Forbidden                [User is not activated]
 *  @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *        "Please go to your inbox and click the link to activate your Email."
 *     }
 *
 *
 *
 */


/**
* Login by Artist
 * ---------------------
 *
 * @api {post} api/users/login               login for artist
 * @apiName Artist login
 * @apiGroup Artists
 *
 *
 *@apiParam {string}  email
 *
 * @apiParam {string} password
 * @apiHeader {string}  x-auth       token for frontend to send the response
 * @apiParamExample {json} Request-Example:
 *     {
 *       "email": "ayamahmoudabdelfatah99@gmail.com",
 *       "password":"1234"
 *     }
 *@apiHeader (Response Header) {String} x-auth [token given for the logging in user]
 *
 * @apiError 401   [authentication failed]
 *@apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 401
 *     {
 *        "Either email or passwrod is incorrect"
 *     }
 *
 *
 * @apiError  403  Forbidden                [User is not activated]
 *  @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *        "Please go to your inbox and click the link to activate your Email."
 *     }
 *
 *
 *
 */



/** Get artist
* ---------------------
*
* @api {Get} api/Artists/:id              Get artist
* @apiName Get Artist
* @apiGroup Artists
*
*
* @apiParam {string}    id           the id of the artist needed to be retrived
*
* @apiSuccess {object}               object of type artist in JSON formatwith status code 200
*
* @apiSuccessExample {JSON} Success-Response:
*     HTTP/1.1 200 OK{
*      
*{
*    "_id" : ObjectId("5e8902475501bd142cbeff13"),
*    "email" : "be12@hotmail.com",
*    "password" : "$2b$10$sqP.uu/YJzYg0vErxw24TeMe8eeUzPtWCrSST8gGn9wMxYNQxqGNS",
*    "artistName" : "Billie Eilish",
*    "about" : "Billie Eilish is an American singer-songwriter who first shot to prominence when she uploaded her breakout hit \n    \"Ocean Eyes\" to SoundCloud in 2015. ... She worked with her brother, Finneas O'Connell, to record \"Ocean Eyes,\"\n     a song O'Connell had initially written for his band",
*    "gender" : "M",
*    "birthDate" : ISODate("2001-12-18T00:00:00.000Z"),
*    "imagePath" : "./Pictures/Billie-Eilish.png",
*    "isActive" : false,
*    "rating" : -1,
*    "genres" : [
*        "sha3by",
*        "R&B"
*    ],
*    "__v" : 0
*}
*    
*      }
*
 * @apiError 401  authentication failed
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 401
 *     {
 *       "Token is not valid"
 *     }
 *
*
* @apiError  404                      [id is invalid]
*  @apiErrorExample {JSON} Error-Response:
*     HTTP/1.1 404 Not Found
*     {
*       "invalid id"
*     }
*
* @apiError  404                    [Artist not found]
*  @apiErrorExample {JSON} Error-Response:
*     HTTP/1.1 404
*     {
*       "can not find artist"
*     }
*
* @apiError  400 Bad Request                    [Error while executing request]
 */


/** Search
* ---------------------
*
* @api {Get} /Search             Search about a word
* @apiName Search
* @apiGroup Search
*
*
* @apiParam {string}    word         word to search about
* @apiHeader {string}  x-auth       token for frontend to send the response
* @apiSuccess {object}               object containing five simplified arrays artists albums tracks profiles and playlists
*
* @apiSuccessExample {JSON} Success-Response:
*     HTTP/1.1 200 OK
*      {
*{
*    "artists": [
*        {
*            "_id": "5e6942b6646c86bc20fc9a92",
*            "artistName": "Adele",
*            "imagePath" : "./Pictures/default.png",
*        }
*    ],
*    "Albums": [
*        {
*           "_id": "5e7a8bb2a986d07c0c22277d",
*            "albumName": "25",
*            "imagePath" : "./Pictures/default.png",
*            "artistName": "Adele",
*            "artistId": "5e6942b6646c86bc20fc9a92"
*        }
*    ],
*    "Tracks": [
*        {
*            "_id": "5e7e626d4849be7c17be3552",
*            "trackName": "Hello",
*            "imagePath" : "./Pictures/default.png",
*            "artistId": "5e6942b6646c86bc20fc9a92"
*        }
*    ],
*        "Playlists": "Playlists": [
*        {
*            "_id": "5e6942b6646c86bc20fc9a89",
*            "playlistName": "Dejavu",
*            "imagePath" : "./Pictures/default.png",
*            "userName": "hamadaaa",
*            "userId": "5e6d547b639f2ca419a1c08d"
*        }
*],
*                    ,
*   "Users": [{
*                    "_id": "5e6d547b639f2ca419a1c08d",
*            "userName": "hamadaaa",
*            "imagePath" : "./Pictures/default.png",
 *        }]
*      }
 *
 *
 *
 * @apiSuccessExample {JSON} Success-Response:
*     HTTP/1.1 200 OK
*      {
*
 *
 *
 * }
 * @apiError 401  authentication failed
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 401
 *     {
 *       "Token is not valid"
 *     }
 *
*
* @apiError  400 Bad Request                    [Error while executing request]
 */




/**
* Delete album
 * ---------------------
 *
 * @api {post} api/album/:id/delete              delete album
 * @apiName  Delete album
 * @apiGroup Album
 *
 *
 *@apiParam {string}  id
 *
* @apiHeader {string}  x-auth       token to delete album
*
 *@apiHeader (Response Header) {String} x-auth [token given for the logging in user]
 * @apiSuccessExample {JSON} Success-Response:
*     HTTP/1.1 200 OK
*      {
 *      "deleted"
 *      }
 * @apiError 401   [authentication failed]
 *@apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 401
 *     {
 *        "Token is not valid"
 *     }
 *
 *
 * @apiError  403  Forbidden                [this album is not the artist's album]
 *  @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *        "NotAuthorized"
 *     }
 *
 *
 *
  * @apiError  404  Not found                [this album is not found or the id is not an object id]
 *  @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 404 Not found 
 *     {
 *        "Notfound"
 *     }
 *
 *  @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 404 Not found
 *     {
 *        "invalid id"
 *     }
 *
 */


////////////////// Ranime Hossam //////////////////
/**
* Like or Unlike album
 * ---------------------
 * 
 * @api {post} album/like/unlike/:id              Like or Unlike album
 * @apiName  Like or Unlike album
 * @apiGroup Album
 *   
 *  
 *@apiParam {string}  id            sent as a parameter in the url
 * 
* @apiHeader {string}  x-auth       user token to like or unlike album (in header)
*
 * 
 * @apiSuccessExample {string} Success-Response:
*     HTTP/1.1 200 OK
*      {
*          "Like"
*      }
* @apiSuccessExample {string} Success-Response:
*     HTTP/1.1 200 OK
*      {
*          "Unlike"
*      }
*
*
 * @apiError 401   Unauthorized          [authentication failed]
 *@apiErrorExample {string} Error-Response:
 *     HTTP/1.1 401   Unauthorized
 *     {
 *        "Token is not valid"
 *     }
 *
 *
 * @apiError 401   Unauthorized          [authentication failed]
 *@apiErrorExample {string} Error-Response:
 *     HTTP/1.1 401  Unauthorized
 *     {
 *        "Token is Empty"
 *     }
 *
 *
 * 
 *  @apiError  404  Not found                [this album is not found]
 *  @apiErrorExample {string} Error-Response:
 *     HTTP/1.1 404 Not found
 *     {
 *        "No album found"
 *     }
 * 
 * 
 * @apiError  404  Not found                [this is not an ID]
 *  @apiErrorExample {string} Error-Response:
 *     HTTP/1.1 404 Not found
 *     {
 *        "Invalid id"
 *     }
 * 
 * @apiError  500  Internal Server Error               
 *  
 * 
 * 
 * 
 */
/**
* Like or Unlike track
 * ---------------------
 * 
 * @api {post} track/like/unlike/:id              Like or Unlike track
 * @apiName  Like or Unlike track
 * @apiGroup Tracks
 *   
 *  
 *@apiParam {string}  id            sent as a parameter in the url
 * 
* @apiHeader {string}  x-auth       user token to like or unlike track (in header)
*
 * 
 * @apiSuccessExample {string} Success-Response:
*     HTTP/1.1 200 OK
*      {
*          "Like"
*      }
* @apiSuccessExample {string} Success-Response:
*     HTTP/1.1 200 OK
*      {
*          "Unlike"
*      }
*
*
 * @apiError 401   Unauthorized          [authentication failed]
 *@apiErrorExample {string} Error-Response:
 *     HTTP/1.1 401   Unauthorized
 *     {
 *        "Token is not valid"
 *     }
 *
 *
 * @apiError 401   Unauthorized          [authentication failed]
 *@apiErrorExample {string} Error-Response:
 *     HTTP/1.1 401  Unauthorized
 *     {
 *        "Token is Empty"
 *     }
 *
 *
 * 
 *  @apiError  404  Not found                [this track is not found]
 *  @apiErrorExample {string} Error-Response:
 *     HTTP/1.1 404 Not found
 *     {
 *        "No track found"
 *     }
 * 
 * 
 * @apiError  404  Not found                [this is not an ID]
 *  @apiErrorExample {string} Error-Response:
 *     HTTP/1.1 404 Not found
 *     {
 *        "Invalid id"
 *     }
 * 
 * @apiError  500  Internal Server Error               
 *  
 * 
 * 
 * 
 */

 /**
 * change password
 * ---------------
 * @api {put} /api/changepassword Change password
 * @apiName change password
 * @apiGroup User privacy
 *
 * @apiHeader {string}  x-auth    
 * 
 * @apiParam {string} oldPassword      In the Body of the request
 * @apiParam {string} newPassword      In the Body of the request
 * 
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "Password has been changed successfully"
 *     }
 *     
 * * @apiError  403  Forbidden                [Password is incorrect]
 *  @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 403  Forbidden 
 *     {
 *        "Password is incorrect"
 *     }
 * 
 * @apiError 401   Unauthorized               [authentication failed]
 *@apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 401   Unauthorized
 *     {
 *        "Token is Empty"
 *     }
 * 
 * @apiError 401   Unauthorized               [authentication failed]
 *@apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 401   Unauthorized 
 *     {
 *        "User does not have access or does not exist"
 *     }
 * 
 * 
 * 
 */
 


//GET Album by ID
 /**
 * Get album by id
 * -------------------------------------
 * @api {get} /album/:id              Get Album 
 * @apiName GetAlbum
 * @apiGroup Album
 *
 * @apiHeader {string}  x-auth          Required
 *
 * @apiParam {string} albumId           Id of the album in the url
 *
 * @apiSuccess 302                     [The response of the success case is an album object]
 * @apiSuccessExample {JSON} Success-Response:
 *     HTTP/1.1 302
 * {
 *   "returnedAlbum": {
 *       "_id": "5e8cea27f80b6f47045be012",
 *       "albumName": "This Acting",
 *       "imagePath": "sia.png",
 *       "artistName": "Sia",
 *       "tracks": [
 *           "5e8cea26f80b6f47045be001",
 *           "5e8cea26f80b6f47045be002"
 *       ],
 *       "likes": 9
 *   }
 * }
 *
 * }
 * @apiError  404   Not found                   [the album id is not found ]
 * @apiErrorExample {string} Error-Response:
 *     HTTP/1.1 404 Not found 
 *     {
 *       "Id not found"
 *     }
 *  * @apiError 401   Unauthorized               [authentication failed]
 *@apiErrorExample {string} Error-Response:
 *     HTTP/1.1 401   Unauthorized
 *     {
 *        "Token is Empty"
 *     }
 * 
 * @apiError 401   Unauthorized               [authentication failed]
 *@apiErrorExample {string} Error-Response:
 *     HTTP/1.1 401   Unauthorized 
 *     {
 *        "User does not have access or does not exist"
 *     }
 * 
 * 
 * 
 */

//GET User Profile
 /**
 * Get User Profile
 * -------------------------------------
 * @api {get} /users/me                 Get User Profile 
 * @apiName GetUserProfile 
 * @apiGroup Users
 *
 * @apiHeader {string}  x-auth          Required
 *
 *
 * @apiSuccess 302                     [The response of the success case is an album object]
 * @apiSuccessExample {JSON} Success-Response:
 *     HTTP/1.1 302
 * {
 *      {
 *  "_id": "5e8a0d954b4daf4ee08a2f65",
 *   "userName": "ranime",
 *   "email": "ranimemohamed8@gmail.com",
 *   "password": "$2b$10$lPLeQWsAgsQHywSK1VS/GO6bN/uCA9v/aWVPf18HlNXFPzFnpSzxC",
 *   "gender": "F",
 *   "birthDate": "1999-05-30T00:00:00.000Z",
 *   "__v": 0,
 *   "likedAlbums": [],
 *   "likedTracks": [],
 *   "imagePath": "defaultuser.png",
 *   "isActive": true,
 *   "isPremium": false
*}
 *
 * }
 * @apiError  404   Not found                   [the user id is not found ]
 * @apiErrorExample {string} Error-Response:
 *     HTTP/1.1 404 Not found 
 *     {
 *       "Id not found"
 *     }
 *   @apiError 401   Unauthorized               [authentication failed]
 *@apiErrorExample {string} Error-Response:
 *     HTTP/1.1 401   Unauthorized
 *     {
 *        "Token is Empty"
 *     }
 * 
 * @apiError 401   Unauthorized               [authentication failed]
 *@apiErrorExample {string} Error-Response:
 *     HTTP/1.1 401   Unauthorized 
 *     {
 *        "User does not have access or does not exist"
 *     }
 * 
 * 
 * 
 */
/**
 * Get user's current playlists
 * -------------------------------------
 * @api {get} /playlists/me            Get current user's playlist
 * @apiName GetUserCurrentPlaylist
 * @apiGroup Playlists
 *
 * @apiHeader {string} x-auth          Required
 *      
 * 
 * @apiSuccess 302                     [The response of the success case is playlist object(s)]
 * @apiSuccessExample {JSON} Success-Response:
 *     HTTP/1.1 302
 * 
 *   {
 *  "playlist": [
 *       {
 *           "privacy": true,
 *           "imagePath": "default.png",
 *           "tracks": [
 *               "5e8a701954fe752c1498f729",
 *               "5e8a701954fe752c1498f72a"
 *           ],
 *           "_id": "5e8a701954fe752c1498f72f",
 *           "userId": "5e8a701954fe752c1498f721",
 *           "playlistName": "Dejavu",
 *           "__v": 0
 *      },
 *      {
 *           "privacy": true,
 *           "imagePath": "default.png",
 *           "tracks": [
 *               "5e8a701954fe752c1498f729",
 *               "5e8a701954fe752c1498f72a",
 *               "5e8a701954fe752c1498f72b",
 *               "5e8a701954fe752c1498f72c"
 *           ],
 *           "_id": "5e8a701954fe752c1498f730",
 *           "userId": "5e8a701954fe752c1498f721",
 *           "playlistName": "Classics",
 *           "__v": 0
 *       },
 *       {
 *           "privacy": false,
 *           "imagePath": "default.png",
 *           "tracks": [
 *               "5e8a701954fe752c1498f729",
 *               "5e8a701954fe752c1498f72a",
 *               "5e8a701954fe752c1498f72b",
 *               "5e8a701954fe752c1498f72c",
 *               "5e8a701954fe752c1498f72d"
 *           ],
 *           "_id": "5e8a701954fe752c1498f731",
 *           "userId": "5e8a701954fe752c1498f721",
 *           "playlistName": "X",
 *           "__v": 0
 *       }
 *   ]
 *  } 
 *
 * 
 * 
 * 
*  @apiError 401   Unauthorized               [authentication failed]
 *@apiErrorExample {string} Error-Response:
 *     HTTP/1.1 401   Unauthorized
 *     {
 *        "Token is Empty"
 *     }
 * 
 * @apiError 401   Unauthorized               [authentication failed]
 *@apiErrorExample {string} Error-Response:
 *     HTTP/1.1 401   Unauthorized 
 *     {
 *        "User does not have access or does not exist"
 *     }
 * 
 * 
 * 
 * 
 */



/**
 * Get user's current Liked Tracks
 * -------------------------------------
 * @api {get} /tracks/like/me            Get user's current Liked Tracks
 * @apiName GetUserCurrentLikedTracks
 * @apiGroup Library
 *
 * @apiHeader {string} x-auth          Required
 *      
 * 
 * @apiSuccess 302                     [The response of the success case is track ID(s)]
 * @apiSuccessExample {Array} Success-Response:
 *     HTTP/1.1 302
 * [
 *  "5e8b45fb97022f4d7cd9907e"
 * ]
 *
 * 
*  @apiError 401   Unauthorized               [authentication failed]
 *@apiErrorExample {string} Error-Response:
 *     HTTP/1.1 401   Unauthorized
 *     {
 *        "Token is Empty"
 *     }
 * 
 * @apiError 401   Unauthorized               [authentication failed]
 *@apiErrorExample {string} Error-Response:
 *     HTTP/1.1 401   Unauthorized 
 *     {
 *        "User does not have access or does not exist"
 *     }
 * 
 *
 * 
 */



 /**
 * Get user's current Liked Albums
 * -------------------------------------
 * @api {get} /album/like/me            Get user's current Liked Albums
 * @apiName GetUserCurrentLikedAlbums
 * @apiGroup Library
 *
 * @apiHeader {string} x-auth          Required
 *      
 * 
 * @apiSuccess 302                     [The response of the success case is Albums ID(s)]
 * @apiSuccessExample {Array} Success-Response:
 *     HTTP/1.1 302
 * [
 *  "5e8b45fb97022f4d7cd9907e"
 * ]
 *
 * 
*  @apiError 401   Unauthorized               [authentication failed]
 *@apiErrorExample {string} Error-Response:
 *     HTTP/1.1 401   Unauthorized
 *     {
 *        "Token is Empty"
 *     }
 * 
 * @apiError 401   Unauthorized               [authentication failed]
 *@apiErrorExample {string} Error-Response:
 *     HTTP/1.1 401   Unauthorized 
 *     {
 *        "User does not have access or does not exist"
 *     }
 * 
 *
 * 
 */




///monica////////////////////////////
 
/**
 * @api {get} /albums/homepage/popular    Get popular Albums for homepage
 * @apiName GetPopularAlbums
 * @apiGroup Album
 *          
 ** @apiHeader {string}  x-auth          Required token of the user
 * @apiSuccess {object[]}   albums        An array of Album objects containing the full details of each  Album
 *
 * @apiSuccessExample {JSON} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *      "albums": 
 * [
 *    {
 *       "_id": "5e89f2caaaa6bd3f481675f5",
 *       "artistId": "5e89f2caaaa6bd3f481675eb",
 *       "albumName": "25",
 *       "__v": 0,
 *       "likes": 88,
 *       "rating": 5,
 *       "tracks": [
 *           "5e89f2caaaa6bd3f481675f0",
 *           "5e89f2caaaa6bd3f481675f1"
 *       ],
 *       "imagePath": "default.png"
 * },
 * 
 *   {
 *       "_id": "5e89f2caaaa6bd3f481675f6",
 *       "artistId": "5e89f2caaaa6bd3f481675e8",
 *       "albumName": "bla bla",
 *       "__v": 0,
 *       "likes": 100,
 *       "rating": 5,
 *       "tracks": [
 *           "5e89f2caaaa6bd3f481675f0",
 *           "5e89f2caaaa6bd3f481675f1"
 *       ],
 *       "imagePath": "default.png"
 * }
 * ],
 * 
}
 *
 *
 * @apiError 401   Unauthorized               [authentication failed]
 *@apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 401   Unauthorized 
 *     {
 *        "message":"authenticaton failed"
 *     }
 * 
 * 
 * 
 */







/**
 * @api {get} /users/followed/artists    Get followed artists of the user
 * @apiName GetFollowedArtitsOfTheUser
 * @apiGroup Users
 *          
 ** @apiHeader {string}  x-auth          Required token of the user
 * @apiSuccess {object[]} artists              simplified array of artists objects
 *
 * @apiSuccessExample {JSON} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *    "artists":
 * [
 * {  "artistName":"Adele",
 *     "followDate": "2020-04-04T18:14:27.889Z",
 *   
 *   "rate":"3"
 *  },
 *   {
 * 
 *     "artistName":"Eminem",
 *     "followDate": "2020-04-04T18:14:27.889Z",
 *     "rate":"7"
 *    }
 * 
 * 
 *    ]
 * }
 *
 *
 * @apiError 401   Unauthorized               [authentication failed]
 *@apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 401   Unauthorized 
 *     {
 *        "message":"authenticaton failed"
 *     }
 * 
 * 
 * 
 */


/**
 * @api {post} /users/:artistId/follow     follow an artist
 * @apiName FollowAnArtist
 * @apiGroup Users
 *          
 * @apiHeader {string}  x-auth          Required token of the user
 * @apiParam {string}  artistId         id of artist you want to follow
 * 
 *
 * @apiSuccessExample {JSON} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *   "message":"followed"
 * 
 * 
 *    
 * }
 *
 *
 * @apiError 401              [authentication failed]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 401   Unauthorized 
 *     {
 *        "message":"authenticaton failed"
 *     }
 * 
 * @apiError 404               [artist not found]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 404   Not-Found  
 *     {
 *        "message":"artist not found"
 *     }
 * 
 * 
 * 
 *  
 * 
 * 
 */


/**
 * @api {get} /notification/artistupadtes    get notification of artist updates
 * @apiName GetArtistUpdatesNotifications
 * @apiGroup Notifications
 *          
 * @apiHeader {string}  x-auth          Required token of the user
 * 
 *
 * @apiSuccessExample {JSON} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *   [
 *   {
 *       "_id": "5e9e5c54d8f9952f3060cfb5",
 *       "text": "Eminem released a new Song (Lose Ypurself)",
 *       "sourceId": "5e9e3b99f2196e181a41e089",
 *       "userType": "artist",
 *       "__v": 0,
 *       "sentTo": [
 *           "5e9e6287e1bd0b278ce05fb4"
 *       ],
 *       "sent": true
 *   }
 *]
 * 
 * 
 *    
 * }
 *
 *
 * @apiError 401              [authentication failed]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 401   Unauthorized 
 *     {
 *        "message":"Token is not valid"
 *     }
 * 
 * 
 * 
 * 
 *  
 * 
 * 
 */

 //monica////
 /** Like and Unlike a playlist
 * ---------------------
 * 
 * @api { post } /playlists/:playlistId/like/unlike/me             Like and Unlike a playlist
 * @apiName  Like and unlike playlist
 * @apiGroup Playlists
 *   
 *  
 * @apiParam { string } playlistId    should be passed in params
 * 
 * @apiHeader { string }  x-auth       user's token
 *
 * @apiSuccessExample { JSON } Success - Response:
 * HTTP / 1.1 200 OK
 * {
 *    "message":"liked a playlist"
 * }
 * 
 * @apiSuccessExample { JSON } Success - Response:
 * HTTP / 1.1 200 OK
 * {
 *    "message":"unliked a playlist"
 * }
 * 
 * 
 * 
*  @apiError  404                      [playlist not found]
*  @apiErrorExample {JSON} Error-Response:
*     HTTP/1.1 404 Not Found
*     {
*       "message": "playlist not found"
*     }
*
* @apiError  404                    [invalid playlist id]
*  @apiErrorExample {JSON} Error-Response:
*     HTTP/1.1 404 Not Found
*     {
*       "message": "invalid id"
*     }
*
 * 
 *
 *
 * @apiError 401      [authentication failed]
 * @apiErrorExample {JSON} Error - Response:
 * HTTP / 1.1 401   Unauthorized
 * {
 *        "message":"authentication failed"
 *     }
 *
 *
 * @apiError 400         [trying to like a private playlist]
 * @apiErrorExample { JSON } Error - Response:
 * HTTP / 1.1 401  Bad Request
 * {
 *           "message":"forbidden you can not like a private playlist"
 *     }
 *
 *
 * 
 * /
 * */

 
/** edit a playlist 's name
 * ---------------------
 * 
 * @api { post } /playlists/:playlistId/edit            edit a playlist 's name
 * @apiName  edit a playlist 's name
 * @apiGroup Playlists
 *   
 *  
 * @apiParam { string } playlistId    should be passed in params
 * @apiParam {string} playlistName    should be passed in body
 * @apiHeader { string }  x-auth       user's token
 *
 * @apiSuccessExample { JSON } Success - Response:
 * HTTP / 1.1 200 OK
 * {
 *     "message": "playlist name changed successfully"
 * }
 * 
 * 
 * 
*  @apiError  404                      [playlist not found]
*  @apiErrorExample {JSON} Error-Response:
*     HTTP/1.1 404 Not Found
*     {
*       "message": "playlist not found"
*     }
*
* @apiError  404                    [invalid playlist id]
*  @apiErrorExample {JSON} Error-Response:
*     HTTP/1.1 404 Not Found
*     {
*       "message": "invalid id"
*     }
*
 * 
 *
 *
 * @apiError 401      [authentication failed]
 * @apiErrorExample {JSON} Error - Response:
 * HTTP / 1.1 401   Unauthorized
 * {
 *        "message":"authentication failed"
 *     }
 *
 *
 * @apiError 403         [changing another user's playlist]
 * @apiErrorExample { JSON } Error - Response:
 * HTTP / 1.1 403  Forbidden
 * {
 *           
    "message": "you are not allowed to make this request"
 *     }
 *@apiError 400         [user can not have two or more playlists with the same name]
 * @apiErrorExample { JSON } Error - Response:
 * HTTP / 1.1 400  Bad Request
 * {
 *           
    "message": "you already have a playlist with the same name"
 *     }
 *
 *
 * 
 * /
 * */


 
/** get a user's liked playlists
 * ---------------------
 * 
 * @api {get} /playlists/liked/me           get a user's liked playlists
 * @apiName  get a user's liked playlists
 * @apiGroup Playlists
 *   
 *  
 * @apiHeader { string }  x-auth       user's token
 * @apiSuccess {object[]}   likedPlaylists     array of likedPlaylists object 
 * @apiSuccessExample { JSON } Success - Response:
 * HTTP / 1.1 200 OK
 * 
 * {
 * 
 * "likedPlaylists": [
 *      
 *        {
 *           "creator": "monica",
 *           "playlistId": "5e9d5c3c682ddc25100e72cd",
 *           "playlistName": "favs",
 *           "likes": 1,
 *           "tracks": [
 *               "5e9d5ba78d6d7148a8860da3"
 *           ],
 *           "imagePath": "default.jpeg",
 *           "privacy": false
 *       },
 *       {
 *           "creator": "Spotify",
 *           "playlistId": "5ea08233370ecb40db0e0b68",
 *           "playlistName": "indies",
 *           "likes": 2,
 *           "tracks": [
 *               "5e9d5ba78d6d7148a8860da3",
 *               "5e9d5ba78d6d7148a8860da4",
 *               "5e9d5ba78d6d7148a8860da5",
 *               "5e9d5ba78d6d7148a8860da7",
 *               "5e9d5ba78d6d7148a8860da6"
 *           ],
 *          "imagePath": "default.jpeg",
 *           "privacy": false
 *      }
 *   ]
 * }
 * 
*  @apiError  404                      [no liked playlists]
*  @apiErrorExample {JSON} Error-Response:
*     HTTP/1.1 404 Not Found
*     {
*       "message": "the user has not liked any playlist yet"
*     }
*
 * 
 *
 *
 * @apiError 401      [authentication failed]
 * @apiErrorExample {JSON} Error - Response:
 * HTTP / 1.1 401   Unauthorized
 * {
 *        "message":"authentication failed"
 *     }
 *
 
 * 
 * /
 * */