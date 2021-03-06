// this is the main entry point for your full app
// it serves your frontend & provides access to your API
require('dotenv').config()
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const api = require('./api');
const appointmentsRouter = require('./api/routes/appointments.js')

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.method + ': ' + req.path);
  next();
});

app.use('/', express.static(__dirname + '/client/build/'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/build/index.html');
});

app.use('/api', api);
app.use('/api/appointments', appointmentsRouter)

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening at http://localhost:${port}`));
