require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const hbs = require('hbs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const nonce = require('nonce')();

const Store = require('./models/Store');

const {
  SHOPIFY_APP_SECRET,
  PORT,
  MONGO_URI,
  SHOPIFY_APP_KEY,
  SHOPIFY_APP_SCOPE,
  host
} = process.env;

// DB Config
const db = MONGO_URI;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

mongoose.set('useFindAndModify', false);

const app = express();

app.use(express.static('assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Handlebars helper to skip sections for Shopify to compile values
hbs.registerHelper('raw', function (options) {
  return options.fn();
});

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'hbs');

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
    return res.render('update', {
      installUrl
    });
  } else {
    const authToken = jwt.sign({}, SHOPIFY_APP_SECRET, {
      expiresIn: '7d'
    });
    return res.render('admin', {
      authToken
    });
  }
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
