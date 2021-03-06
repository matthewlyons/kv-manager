require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const nonce = require('nonce')();

const { connectDB } = require('./helpers');

const Store = require('./models/Store');

const {
  SHOPIFY_APP_SECRET,
  PORT,
  SHOPIFY_APP_KEY,
  SHOPIFY_APP_SCOPE,
  host
} = process.env;

connectDB().then((message) => {
  console.log(message);
});

const app = express();

app.use(cors());
app.use(express.static('assets'));
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use('/admin', require('./routes/admin/'));
app.use('/install', require('./routes/install/'));
app.use('/proxy', require('./routes/proxy/'));
app.use('/webhook', require('./routes/webhook/'));

app.get('/*', async function (req, res) {
  let { shop } = req.query;
  if (!shop) {
    return res.status(401).json({ errors: [{ message: 'Unauthorized' }] });
  }

  let shopifyStore = await Store.findOne({ store: shop });

  if (!shopifyStore) {
    const state = nonce();
    const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_APP_KEY}&scope=${SHOPIFY_APP_SCOPE}&redirect_uri=${host}/install&state=${state}`;
    return res.redirect(installUrl);
  } else if (shopifyStore.scope !== SHOPIFY_APP_SCOPE) {
    const state = nonce();
    const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_APP_KEY}&scope=${SHOPIFY_APP_SCOPE}&redirect_uri=${host}/install&state=${state}`;
    const authToken = jwt.sign({}, SHOPIFY_APP_SECRET, {
      expiresIn: '7d'
    });
    return res.render('admin', {
      host,
      installUrl,
      authToken
    });
  } else {
    const authToken = jwt.sign({}, SHOPIFY_APP_SECRET, {
      expiresIn: '7d'
    });
    return res.render('admin', {
      host,
      authToken
    });
  }
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

module.exports = app;
