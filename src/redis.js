const asyncRedis = require("async-redis");
const ENV = require("./env.js");

const client = asyncRedis.createClient({
  host: ENV.env.REDIS_HOST,
  port: ENV.env.REDIS_PORT
});

client.on("connect", function () {
  console.log("redis connected");
});

client.on("error", function (err) {
    console.log("Error " + err);
});

exports.client = client;