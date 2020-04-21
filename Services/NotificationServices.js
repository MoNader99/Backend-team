// JavaScript source code
var { notification } = require("./../models/notifications.js");
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
module.exports = {
    getArtistsNewNotifications
    
}