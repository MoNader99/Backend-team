// JavaScript source code
const bcrypt = require('bcrypt');

const multiparty = require('multiparty');
var { mongoose } = require("./../db/mongoose.js");
var { User } = require("./../models/users.js");  //artists model
var { followUser } = require("./../models/followUser.js");//track model

var GetUserObjectArray = async function (wordtosearch) {
    //return track.find({ trackName: wordtosearch });
    // return track.find({ 'trackName': { '$regex': wordtosearch, $options: 'i' } , 'artistId': { $in: Artists.map(function (value) { return value._id }) } } );
    // try {
    // console.log(Artists.map(function (value) { return value._id.toString() }));

    return User.find({ 'userName': { '$regex': wordtosearch, $options: 'i' } });
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
/**
 * get the endpoints of the users to send a notification to them
 * @author aya
 * @method getUsersEndPoint
 * 
 *@param {array} users
 *@returns {array}  -return array of endpoints of the user
 * 
 */
var getUsersEndPoint = async function (users) {
    var users = await User.find({ "_id": { $in: users } });
    /*.then((Users) => {
        console.log("play");
        //console.log(Users);*/
       /* var filtered2 = users.filter(function (el) {
            console.log(el.endPoint);

            if (el.endPoint !== null) return el;
        });*/
    var arr = [];
    var i = 0;
    users.forEach(user => {
        if (user.endPoint.endpoint !== undefined && user.endPoint.endpoint !== null) {
            console.log(user.endPoint.endpoint);
            arr[i++] = user.endPoint;

        }
    }
    );
   // return Promise.resolve(users.map(function (value) { if (value.endPoint) return value.endPoint; }));
    return Promise.resolve(arr);

   /* })*/
}
/*var getUsersEndPoint = function (users) {
     return getUsersByIds(users).then((Users) => {
        console.log("play");
         console.log(Users);
        var filtered2 = Users.filter(function (el) {
            console.log(el.endPoint);

            if (el.endPoint !== null) return el;
        });
         return Promise.resolve(filtered2.map(function (value) { return value.endPoint; }));

    })
}*/
/**
 * remove the followed user from the array of the users that a user follow
 * @author aya
 * @method deleteUserFromSchema
 * 
 *@param {string} followeduserid
 *@param {string} userId
 *@returns {document}  -return the document of the follow user after update
 * 
 */
var deleteUserFromSchema = function (followeduserid, userId) {
    // followArtist.findOne({ 'userId': userId }).then((userfollow) => {
    //console.log(userId);
   // console.log(artistId);
    //return followArtist.update({ 'user_id': userId }, { $pullAll: { artistId: [artistId] } })
    return followUser.update({ user_id: userId }, { "$pull": { "followedUserInfo": { "userId": followeduserid } } });

}
/**
 * add the followed user in the array of the users that a user follow
 * @author aya
 * @method addUserToSchema
 * 
 *@param {string} followeduserid
 *@param {string} userId
 *@param {string} userName
 *@returns {document}  -return the document of the follow user after update
 * 
 */
var addUserToSchema = function (followeduserid, userId,userName) {
    // followArtist.findOne({ 'userId': userId }).then((userfollow) => {
    //console.log(userId);
    // console.log(artistId);
    //return followArtist.update({ 'user_id': userId }, { $pullAll: { artistId: [artistId] } })
    return followUser.update({ user_id: userId }, { "$push": { "followedUserInfo": { "userId": followeduserid, "userName": userName, "followDate": Date.now() } } });

}
/**
 * used in login with facebook
 * @author aya
 * @method signUpWithFacebook
 * 
 *@param {Object} req
 *@param {Object} res
 *@param {Function} next
 *@returns {undefined}  -used as middle ware in login with facebook request to add the user if not added and return it or return the user if found
 * 
 */
var signUpWithFacebook = (req, res, next) => {
    console.log("id");
    console.log(req.facebookId);
    User.findOne({ 'facebookId': req.facebookId }).then((user) => {
        //  console.log("dodadadada");
        //  console.log(user);
        if (!user) {
            console.log("da5al henAAAAAAAAAAAA");
            //return new Promise((resolve, reject) => {
           addFacebookUser(req.facebookId, req.userName, req.email, req.gender, req.bdate).then((user1) => {
                console.log("USER1");
                //console.log(user1);
                //Promise.resolve(user1);
               req.user = user1;
               req.type="first"
               console.log(user1);
               next();
                // return user1;
            }).catch((err) => {
                //Promise.reject();
               return res.status(400).send("wrong paramters");
            })
            //});
        }
        else {
            console.log(user.facebookId);
            req.user = user;
            req.type = "notFirst"
            next();
        }
    }).catch((err) => {
        return res.status(400).send("wrong paramters");
    })
} 
/**
 * gets an array of user objects
 * @author aya
 * @method addFacebookUser
 * 
 *@param {string} facebookId
 *@param {string} userName
 *@param {string} email
 *@param {string} gender
 *@param {string} bdate
 *@returns {Object}  -return the user that is added
 * 
 */
var addFacebookUser =  function (facebookId, userName, email, gender, bdate) {
    console.log("bdate" + bdate);
    console.log(facebookId);
    console.log(userName);
    try {
        var newacc = new User(
            {
                userName: userName,
                email: email,
                facebookId: facebookId,
                gender: gender,
                birthDate: bdate

            });
    }catch  {
        Promise.reject();

    }
    console.log("new acc");
    //console.log(newacc);
    return newacc.save().then((doc) => {
      console.log("2et7at");
        //Promise.resolve(newacc);
        return newacc;
    }).catch((err) => {
        console.log(err);
        Promise.reject(err);
        //return err;
    })
}
/**
 * gets an array of user objects
 * @author aya
 * @method signUpWithFacebook
 * 
 *@param {string} facebookId
 *@param {string} userName
 *@param {string} email
 *@param {string} gender
 *@param {string} bdate
 *@returns {Object}  -return user
 * 
 */
var SignUpWithFacebook = function (facebookId, userName, email, gender, bdate) {
    console.log("id");
    console.log(facebookId);
    return User.findOne({ 'facebookId': facebookId }).then((user) => {
        //  console.log("dodadadada");
        //  console.log(user);
        if (!user) {
            console.log("da5al henAAAAAAAAAAAA");
            //return new Promise((resolve, reject) => {
            return addFacebookUser(facebookId, userName, email, gender, bdate).then((user1) => {
                console.log("USER1");
                //console.log(user1);
                //Promise.resolve(user1);
                return user1;
                // return user1;
            }).catch((err) => {
                //Promise.reject();
                return err;
            })
            //});
        }
    });
}
/**
 * the function that handles follow and unfollow user
 * @author aya
 * @method unFollowUser
 * 
 *@param {string} followeduserid
 *@param {string} userId
 *@returns {string}  -returns "unfollowed" if the user is unfollowed "followed" if the user is followed
 * 
 */
var unFollowUser = function (followeduserid, userId) {
    return deleteUserFromSchema(followeduserid, userId).then((user) => {
        if (user.nModified == 1) return "unfollowed"
        if (user.nModified == 0) {
            return GetUserById(followeduserid).then((userName) => {
                return addUserToSchema(followeduserid, userId, userName).then((user2) => {
                    console.log("tane art");
                    console.log(user2);
                    if (user2.nModified == 1) return "followed";
                    else {
                        console.log(1);
                        console.log(2);
                        var followUser1 = new followUser({
                            user_id: userId,
                            followedUserInfo: [{
                                userId: followeduserid,
                                userName: userName,
                                followDate: Date.now(),
                                //rate:2,
                            }
                            ]
                        });
                        console.log(3);
                        return followUser1.save().then((res) => {
                            console.log(4);
                            return "followed";
                        }, (err) => {
                            return err;
                        });



                    }
                });
            });
        }

    }).catch((err) => {
        Promise.reject(err);
    })


}
var SearchInUsers = function (wordtosearch) {
    return GetUserObjectArray(wordtosearch).then(async (users) => {
        if (users.length === 0) return Promise.resolve([]);

        return Promise.resolve(users.map(user => GetSimplifiedUser(user)));



    })
        // return Promise.resolve(albums);
        .catch((err) => {
            console.log(err);
            return Promise.reject(err);
        })

}

var GetSimplifiedUser = function (user) {
    return ((({ _id, userName, imagePath }) => ({ _id, userName, imagePath}))(user));

}
/**
 * the function that returns a certain user by his id
 * @author aya
 * @method GetUserById
 * 
 *@param {string} id
 *@returns {object}  -returns object of auser with a certain id
 * 
 */
var GetUserById = function (id) {
    console.log("userid");
    console.log(id);
  //  console.log(artist.findById(id).artistName);
    return User.findById(id).then((user) => {
       // console.log(Art.artistName);
        if(!user) return "undefined"
        return user.userName;

    })


}
var HashPassword= async function(password)
{
  try {
    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(password, salt);
   return hashedPass;

  } catch (e) {
    console.log(e);
    console.log("faaaaiiiiilllleeeeddd");
    return Promise.reject();
  }
}


module.exports = {
    SearchInUsers,
    User,
    GetUserById,
    HashPassword,
    unFollowUser,
    signUpWithFacebook,
    getUsersEndPoint
}
