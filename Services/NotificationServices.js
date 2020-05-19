// JavaScript source code
var { notification } = require("./../models/notifications.js");
var push = require('web-push');
var getArtistsNewNotificationObjects =function (Artists, userId) {
    return notification.find({ $and: [{ 'sourceId': { $in: Artists } }, { 'sentTo': { $ne: userId } }] });

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
var pushNotification = function (textNotification, receivers) {
    let vapidKeys = {
        publicKey: 'BJ7BOrLdsc4Lq7jU6wlxFGBChneAR_Lg8587Z5KjEBXJ0Rfd5ZtdGh5bqRYPqbfZpdfvfAHIZ9X9Vw848oTnlXY',
        privateKey: 'cta1wIIeqmLjESmnolE8rWFOiyfImoFZCSOvr5z51MI'
    }   
    console.log(receivers);
    push.setVapidDetails('mailto::test@code.co.uk', vapidKeys.publicKey, vapidKeys.privateKey);
    receivers.forEach(receiver => push.sendNotification(receiver, textNotification));

}
module.exports = {
    getArtistsNewNotifications,
    pushNotification
    
}