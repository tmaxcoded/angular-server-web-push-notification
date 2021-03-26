"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPushSubscriber = void 0;
const in_memory_db_1 = require("./in-memory-db");
function addPushSubscriber(req, res) {
    const sub = req.body;
    console.log('Receiving Subscription on the server: ', sub);
    in_memory_db_1.USER_SUBSCRIPTIONS.push(sub);
    res.status(200).json({ message: "Subscription added successfully." });
}
exports.addPushSubscriber = addPushSubscriber;
