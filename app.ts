import express from 'express';
var cors = require('cors');

import {addPushSubscriber} from './add-push-subscriber.route';
import {sendInstructionNotification} from './send-instruction-notification.route';
const web_push= require('web-push');
const bodyParser = require('body-parser');


// VAPID keys should only be generated only once.
// const vapidKeys = web_push.generateVAPIDKeys();
// console.log('vapid keys ', vapidKeys)

//generate vapid keys
const vapidKeys = {
 publicKey:'BJ8NQfAvfjgxIMTJG-Iis0FpjyHgolT8BiB9R-YFm0seu-my7dhC4Qope2V8nn7i5UcQ04RiCXxHwGB7023l7Os',
 privateKey:'bwqNVudrgofN9-lr23Y-dyQFEoA7psV7S3An7pzHXHA',
}

//set vapid details
web_push.setVapidDetails(
  'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
//npm init --yes,npm i typescript -D  ,  ,tsc --init  ,shift + controlB, npm install pm2 -D, pm2-dev app.js,npm install -D @types/node   , npm install -D @types/express 
const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 3000 || process.env.PORT;

// REST API
app.get("/api/all",(req,res) => {
  console.log('Hello req')
  res.send("Hello People")
})

app.route('/api/subscribe/notifications')
.post(addPushSubscriber);


app.route('/api/instruction/notification')
.post(sendInstructionNotification);



app.listen(port, ()=> console.log("Server Started"))