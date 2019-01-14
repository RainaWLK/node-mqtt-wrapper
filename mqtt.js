const MQTT = require("async-mqtt");

const client = MQTT.connect("mqtt://1.2.3.4", {
  username: "abc",
  password: "ccc"
});
 
client.on("connect", () => {
  console.log('mqtt connected')
});

client.on("error", (err) => {
  console.error('mqtt connect error');
  console.error(err);
});

client.on("message", async (topic, message, packet) => {
  console.log('on message: ' + topic);
  console.log(message);
  console.log(packet);

  await client.unsubscribe(topic);
  console.log(`unsubscribe ${topic} ok`);
});

// When passing async functions as event listeners, make sure to have a try catch block

exports.client = client;