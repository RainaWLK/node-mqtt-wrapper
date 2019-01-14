const MqttClient = require('./mqtt.js');

const client = MqttClient.client;

let uuid="1234567890"

let payload = {
  "deviceUUID": uuid,
  "payload": {
    "method": "get",
    "resource": "/system/properties"
  }
};

async function run_task(task_id) {
  console.log('init_run: uuid '+ uuid);

  try {
    let topic = `${uuid}/test`;

    let granted = await client.subscribe(topic);
    console.log(granted);
    await client.publish(topic, JSON.stringify(payload));


  }
  catch(err) {
    console.log(err);
    throw err;
  }

}

exports.run_task = run_task;