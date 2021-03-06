const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/javascript', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../../assets/proxy.js'));
});

router.use('/api', require('./api'));

router.get('/google-feed', function (req, res) {
  console.log('Hello');
  const file = path.resolve(__dirname + '/../../inventory.txt');
  res.download(file); // Set disposition and send it.
});

// Authorize Api Route
// Send everything from this route back as liquid.
router.use((req, res, next) => {
  res.set('Content-Type', 'application/liquid');
  return next();
  // TODO Proxy Auth
  // if (verifyProxyAuth(req)) {
  //   res.set('Content-Type', 'application/liquid');
  //   return next();
  // } else {
  //   res.status(401).send('Unauthorized');
  // }
});

router.get('/Teacher/Signup', async function (req, res) {
  res.render('proxy/Teacher_Signup');
});

router.get('/Teacher/Signup/Success', async function (req, res) {
  res.render('proxy/Teacher_Signup_Success');
});

router.get('/Teacher/:id', async function (req, res) {
  let authToken = `{{ customer.id | hmac_sha256: 'process.env.APP_SECRET' }}`;
  res.render('proxy/Teacher_Dashboard', {
    authToken
  });
});

router.get('/*', async function (req, res) {
  res.render('proxy');
});

module.exports = router;
