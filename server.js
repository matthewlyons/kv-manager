const express = require('express');
const path = require('path');
const hbs = require('hbs');

const app = express();

app.use(express.static('assets'));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'hbs');

app.use('/admin', require('./routes/admin/'));
// app.use('/install', require('./routes/install/'));
// app.use('/proxy', require('./routes/proxy/'));
// app.use('/webhook', require('./routes/webhooks/'));

app.get('/*', async function (req, res) {
  res.render('admin');
});

app.listen(80, () => {
  console.log('Running on port 80');
});
