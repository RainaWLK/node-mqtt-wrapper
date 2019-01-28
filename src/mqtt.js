const MQTT = require("async-mqtt");
const ENV = require("./env.js");
const Redis = require('./redis.js');


let task_array = {};


const client = MQTT.connect(`mqtt://${ENV.env.MQTT_BROKER}:${ENV.env.MQTT_PORT}`, {
  username: ENV.env.MQTT_USERNAME,
  password: ENV.env.MQTT_PASSWORD
});
 
client.on("connect", (connack) => {
  console.log('mqtt client connected');
  console.log(connack);
});

client.on("reconnect", () => {
  console.log('mqtt client reconnecting')
});

client.on("error", (err) => {
  console.error('mqtt client error');
  console.error(err);
});

client.on("close", () => {
  console.log('mqtt client closed')
});

client.on("offline", () => {
  console.log('mqtt client offline')
});

client.on("end", () => {
  console.log('mqtt clinet end')
});

client.on("message", async (topic, message, packet) => {
  let msg_json = message.toJSON();
  let payload = String.fromCharCode.apply("", new Uint8Array(msg_json.data));
  payload = JSON.parse(payload);
  console.log('on message: ' + topic);
  //console.log(payload);

  try {
    await client.unsubscribe(topic);
    console.log(`unsubscribe ${topic} ok`);

    if(task_array[topic] !== undefined) {
      let task_id = task_array[topic];
      await Redis.client.lpush(task_id, JSON.stringify(payload));
      await Redis.client.expire(task_id, 180);
      console.log('push into redis ok: ' + task_id);

      delete task_array[topic];
    }

  }
  catch (err) {
    console.error(err);
    throw err;
  }
});

// When passing async functions as event listeners, make sure to have a try catch block

exports.client = client;
exports.task_array = task_array;