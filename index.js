'use strict';

require('dotenv').config();

// Start up DB Server
const mongoose = require('mongoose');
const options = {
  useNewUrlParser:true,
  useCreateIndex: true,
};
mongoose.connect(process.env.MONGOLAB_PURPLE_URI, options);

// Start the web server
require('./src/app.js').start(process.env.PORT);
