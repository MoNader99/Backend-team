//var sinon = require('sinon');
//var should = require('should');
//var push = require('web-push');
var notification = require("./../Services/NotificationServices");
//import * as functions from 'web-push';

//var Event = app.models.Event;

describe('events', function () {

  /*  var pushStub;

    beforeEach(function (done) {
        pushStub = sinon.stub(push.sendNotification, 'notifyByQuery', function (query, notification, cb) { cb(); });
        done();
    });
    beforeEach(function (done) {
        pushStub = sinon.stub(app.models.push, 'notifyByQuery', function (query, notification, cb) { cb(); });
        //pushStub = sinon.stub(functions,'sendNotification');
        done();
    });
    afterEach(function (done) {
        pushStub.restore();
        done();
    });

   it('should send push notification when created', function (done) {
       notification.pushNotification('party', [{
            "keys": {
                "auth": "uMwN7TJn8HNC2uEV4ChdPw",
                "p256dh": "BOGtA1AND4od-GzqXR0niqfGcmYDJX9RNtcCHUg-62MDctC0wp0-2TCHF0cghUA6t-CbJgl41bYX_ryspWOkDEo"
            },
            "expirationTime": null,
            "endpoint": "https://fcm.googleapis.com/fcm/send/fTG9C2w1Asc:APA91bEeyCBCibbMXJleTUX3cn14qzDu_hMkskpxRA_1-UXqNjx2j4B9jdK5DVUhJhZgWkIjrPCyFoaI2WBIg8vlwSrDnWjjk7ovAE6NMJlOhB41SiXRHAyLPXNl1KLu32XmpHto0Ac-"
        }]);//.then(() => {
            pushStub.calledOnce.should.eql(true);
            var pushStubCall = pushStub.getCall(0);

            var query = pushStubCall.args[0];
            query.should.eql({});

            var notification = pushStubCall.args[1];
            notification.title.should.eql('Party');
            done();
        });
    //});
    it('should send push notification when created', function (done) {
        //Event.create({ title: 'Party' }, function (err, results) {
        notification.pushNotification('party', [{
            "keys": {
                "auth": "uMwN7TJn8HNC2uEV4ChdPw",
                "p256dh": "BOGtA1AND4od-GzqXR0niqfGcmYDJX9RNtcCHUg-62MDctC0wp0-2TCHF0cghUA6t-CbJgl41bYX_ryspWOkDEo"
            },
            "expirationTime": null,
            "endpoint": "https://fcm.googleapis.com/fcm/send/fTG9C2w1Asc:APA91bEeyCBCibbMXJleTUX3cn14qzDu_hMkskpxRA_1-UXqNjx2j4B9jdK5DVUhJhZgWkIjrPCyFoaI2WBIg8vlwSrDnWjjk7ovAE6NMJlOhB41SiXRHAyLPXNl1KLu32XmpHto0Ac-"
        }]);
            pushStub.calledOnce.should.eql(true);
            var pushStubCall = pushStub.getCall(0);

            var query = pushStubCall.args[0];
            query.should.eql({});

            var notification = pushStubCall.args[1];
            notification.title.should.eql('Party');
            done();
     //   });
    });

});*/
    it('should send push notification to receivers',  function (done) {
        //Event.create({ title: 'Party' }, function (err, results) {
        var receivers= [{
            "keys": {
                "auth": "uMwN7TJn8HNC2uEV4ChdPw",
                "p256dh": "BOGtA1AND4od-GzqXR0niqfGcmYDJX9RNtcCHUg-62MDctC0wp0-2TCHF0cghUA6t-CbJgl41bYX_ryspWOkDEo"
            },
            "expirationTime": null,
            "endpoint": "https://fcm.googleapis.com/fcm/send/fTG9C2w1Asc:APA91bEeyCBCibbMXJleTUX3cn14qzDu_hMkskpxRA_1-UXqNjx2j4B9jdK5DVUhJhZgWkIjrPCyFoaI2WBIg8vlwSrDnWjjk7ovAE6NMJlOhB41SiXRHAyLPXNl1KLu32XmpHto0Ac-"
        },
            {
                "keys": {
                    "auth": "4A01XSXT4KsJrAy7uhxKmQ",
                    "p256dh": "BKEfgfOpYztOAH1IoPM2wK2VcxIn13yDVvPxCF_O9-yAcY-9qpRP6g3leCKb3zcLuso1FFo6NnoprQLF-7accj8"
                },
                "expirationTime": null,
                "endpoint": "https://fcm.googleapis.com/fcm/send/ebHh2YxK51E:APA91bHolSx3CGq7N60y162oPcEkOQVCRvhWQJJ4xpbfpsJoM1MgAUYBqt5tvhKO3OWwhgItviTOmtjb8u-dzYpyErztdtaTXULMxVJBVUIym9iZs433FI5udcy6YHlrXznJIkFrWWMZ"
            }
        ];
        text = "fepwfepfk"
        notification.pushNotification(text, receivers).then((res) => {
            res.forEach(receiver => {
                if (receiver.statusCode !== 201) throw new Error("message not sent");
                console.log(receiver);
            });
            done();
        }).catch((err) => {
            done(err);
        })


       // done();
        //console.log(res);
    });
    it('remove null endpoints', function (done) {
        //Event.create({ title: 'Party' }, function (err, results) {
        var receivers = [null,
        {
            "keys": {
                "auth": "4A01XSXT4KsJrAy7uhxKmQ",
                "p256dh": "BKEfgfOpYztOAH1IoPM2wK2VcxIn13yDVvPxCF_O9-yAcY-9qpRP6g3leCKb3zcLuso1FFo6NnoprQLF-7accj8"
            },
            "expirationTime": null,
            "endpoint": "https://fcm.googleapis.com/fcm/send/ebHh2YxK51E:APA91bHolSx3CGq7N60y162oPcEkOQVCRvhWQJJ4xpbfpsJoM1MgAUYBqt5tvhKO3OWwhgItviTOmtjb8u-dzYpyErztdtaTXULMxVJBVUIym9iZs433FI5udcy6YHlrXznJIkFrWWMZ"
        }
        ];
        text = "fepwfepfk"
        notification.pushNotification(text, receivers).then((res) => {
            res.forEach(receiver => {
                if (receiver.statusCode !== 201) throw new Error("message not sent");
                console.log(receiver);
            });
            done();
        }).catch((err) => {
            done(err);
        })

    });
    it('refuse null array', function (done) {
        //Event.create({ title: 'Party' }, function (err, results) {
        var receivers = null;
        text = "fepwfepfk"
        notification.pushNotification(text, receivers).then((res) => {
            if (res !== false) throw new Error("should return false");
            done();
        }).catch((err) => {
            done(err);
        })
    });

    it('shouls refuse empty array', function (done) {
        //Event.create({ title: 'Party' }, function (err, results) {
        var receivers = [];
        text = "fepwfepfk"
        notification.pushNotification(text, receivers).then((res) => {
            if (res !== false) throw new Error("should return false");
            done();
        }).catch((err) => {
            done(err);
        })
    });

});