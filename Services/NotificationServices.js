// JavaScript source code
var { notification } = require("./../models/notifications.js");
var push = require('web-push');
/**
 * the function that returns the artist new releases that should be sent as notifications
 * @author aya
 * @method getArtistsNewNotificationObjects
 * 
 *@param {string} userId
 *@param {array} Artists
 *@returns {array}  -returns array of documents of the notifications of a certain artist
 * 
 */
var getArtistsNewNotificationObjects =function (Artists, userId) {
    return notification.find({ $and: [{ 'sourceId': { $in: Artists } }, { 'sentTo': { $ne: userId } }] });

}
/**
 * the function that returns the 10 last notifications that should be sent to a user or an artist
 * @author aya
 * @method getLastNotifications
 * 
 *@param {string} userId
 *@returns {array}  -returns array of last notifications of a certain user or artist
 * 
 */
var getLastNotifications = function (userId) {
    return notification.find({ 'shouldBeSentTo': userId }).sort('-date').limit(10).exec(function (err, posts) {
        console.log("Emitting Update...");
        //socket.emit("Update", posts.length);
        // console.log("Update Emmited");
    });
}
/**
 * the function that returns the 10 last notifications that should be sent to a user or an artist
 * @author aya
 * @method getArtistsNewNotifications
 * 
 *@param {string} userId
  *@param {array} Artists
 *@returns {array}  -returns array of notifications  that haven't beeen sent to  acertain user yet and mark them as sents
 * 
 */
var getArtistsNewNotifications= function (Artists, userId) {
    return getArtistsNewNotificationObjects(Artists, userId).then((notifications) => {
        return addUserToSentToArray(notifications,userId).then(() => {
                return Promise.resolve(notifications);

        })
})
}
/**
 * the function that adds the user or artist in sent to array inside a notification object after it is sent
 * @author aya
 * @method addUserToSentToArray
 * 
 *@param {string} userId
  *@param {array} notifications
 *@returns {array}  -returns array of notifications
 * 
 */
var addUserToSentToArray = function (notifications, userId) {
    var Notifications = notifications.map(function (value) { return value._id.toString() });

    return notification.updateMany(
        { '_id': { $in: Notifications } },
        { $push: { sentTo: userId } },
        // done
    )
}
/**
 * the function that sends a notification with a certain text to receivers
 * @author aya
 * @method pushNotification
 * 
 *@param {string} textNotification
  *@param {array} receivers  -array of end points
 *@returns {array}  -returns the array of responses after the notification is sent
 * 
 */
var pushNotification = async function (textNotification, receivers) {
    console.log("rec");
    console.log(receivers);
    if (!receivers) return false;
    let vapidKeys = {
        publicKey: 'BJ7BOrLdsc4Lq7jU6wlxFGBChneAR_Lg8587Z5KjEBXJ0Rfd5ZtdGh5bqRYPqbfZpdfvfAHIZ9X9Vw848oTnlXY',
        privateKey: 'cta1wIIeqmLjESmnolE8rWFOiyfImoFZCSOvr5z51MI'
    }   
var filtered = receivers.filter(function (el) {
  return el != null;
    });
    if (!filtered) return false;
    if (filtered.length == 0) return false;
    console.log("filtered");
    console.log(filtered);
    push.setVapidDetails('mailto::test@code.co.uk', vapidKeys.publicKey, vapidKeys.privateKey);
    var filtered2 = filtered.filter(function (el) {
        if (el.endPoint !== null) return el;
    });

    console.log("filtered2");
    console.log(filtered2);
   // var x = await push.sendNotification(filtered2[0], textNotification);
   // console.log(x);
    var arrayOfCodes=[];
    var i = 0;
    filtered2.forEach(receiver => {
        var x=push.sendNotification(receiver, textNotification);
        arrayOfCodes[i++] = x;
    });
    return Promise.resolve(await Promise.all(arrayOfCodes));
}
module.exports = {
    getArtistsNewNotifications,
    pushNotification,
    getLastNotifications

    
}