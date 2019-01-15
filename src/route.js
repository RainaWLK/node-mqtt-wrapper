const express = require('express');
const router = express.Router();
const tasks = require('./tasks.js');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log(`${req.method} ${req.url}, Time:` + Date.now());
  next();
});
// define the home page route
router.get('/task', async (req, res) => {
  res.end('task');
});

router.post('/task', async function(req, res) {
  let uuid = req.body.deviceUUID;
  let payload = req.body.payload;

  let task_id = await tasks.run_task(uuid, payload);

  res.send(task_id);
});


module.exports = router;