// JavaScript source code
var { notification } = require("./../models/notifications.js");
var push = require('web-push');
var getArtistsNewNotificationObjects =function (Artists, userId) {
    return notification.find({ $and: [{ 'sourceId': { $in: Artists } }, { 'sentTo': { $ne: userId } }] });

}
var getLastNotifications = function (userId) {
    return notification.find({ 'shouldBeSentTo': userId }).sort('-date').limit(10).exec(function (err, posts) {
        console.log("Emitting Update...");
        //socket.emit("Update", posts.length);
        // console.log("Update Emmited");
    });
}
var getArtistsNewNotifications= function (Artists, userId) {
    return getArtistsNewNotificationObjects(Artists, userId).then((notifications) => {
        return addUserToSentToArray(notifications,userId).then(() => {
                return Promise.resolve(notifications);

        })
})
}
var addUserToSentToArray = function (notifications, userId) {
    var Notifications = notifications.map(function (value) { return value._id.toString() });

    return notification.updateMany(
        { '_id': { $in: Notifications } },
        { $push: { sentTo: userId } },
        // done
    )
}
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