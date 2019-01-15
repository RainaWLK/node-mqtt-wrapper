const MqttClient = require('./mqtt.js');
const crypto = require('crypto');


const client = MqttClient.client;

async function run_task(uuid, payload) {
  console.log('init_run: ' + uuid + ' ' + payload.resource);

  let src = uuid+payload.method+payload.resource+Date.now()+Math.random();
  
  let md5 = crypto.createHash('md5');
  let task_id = 'rt-' + md5.update(src).digest('hex');

  try {
    let pub_topic = `$ThingsPro/devices/${uuid}/server`;
    let topic = `$ThingsPro/devices/${uuid}/client`;

    await client.subscribe(topic);
    payload.task_id = task_id;
    await client.publish(pub_topic, JSON.stringify(payload));
    
    MqttClient.task_array[topic] = task_id;

    return task_id;
  }
  catch(err) {
    console.log(err);
    throw err;
  }

}

exports.run_task = run_task;