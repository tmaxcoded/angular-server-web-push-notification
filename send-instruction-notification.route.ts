import { USER_SUBSCRIPTIONS } from './in-memory-db';

const web_push = require('web-push');

const options = {
    TTL: 60,
    vapidDetails:{
        subject: 'mailto:example@yourdomain.org',
        publicKey:'BJ8NQfAvfjgxIMTJG-Iis0FpjyHgolT8BiB9R-YFm0seu-my7dhC4Qope2V8nn7i5UcQ04RiCXxHwGB7023l7Os',
        privateKey:'bwqNVudrgofN9-lr23Y-dyQFEoA7psV7S3An7pzHXHA',
    }
   
   }

export function sendInstructionNotification(req: any, res: any){
  console.log('Total subscriptions', USER_SUBSCRIPTIONS.length);

        // sample notification payload
        const notificationPayload = {
          "notification": {
              "title": "Instruction Notifications",
              "body": "A new instruction has just been sent",
              "icon": "assets/notification.png",
              "vibrate": [100, 50, 100],
              "data": {
                  "dateOfArrival": Date.now(),
                  "primaryKey": 1
              },
              "actions": [{
                  "action": "explore",
                  "title": "Go to the site"
              }]
          }
      };

    //   subscribers.forEach((subscriber,id) => {
    //     webPush.sendNotification(subscriber,
    //       JSON.stringify(transaction),
    //       options)
    //       .then(() => console.log(`${subscribers.size} subscribers notified.`)
    //       ).catch(error => console.error('Error in pushing notification', error))
    //   })

      Promise.all(USER_SUBSCRIPTIONS
        .map(sub => web_push.sendNotification(sub, JSON.stringify(notificationPayload), options)))
        .then(() => res.status(200).json({message: 'Newsletter sent successfully.'}))
        .catch(err => {
            console.error("Error sending notification, reason: ", err);
            res.sendStatus(500);
        });
}