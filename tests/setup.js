jest.setTimeout(120000)

require('../models/User')

const mongoose = require('mongoose');
//const keys = require('../config/keys')

//mongoose.Promise = global.Promise;
mongoURI= 'mongodb+srv://prudhvi:0$yVL4U3!@cluster0.i8eba.mongodb.net/<dbname>?retryWrites=true&w=majority',

//mongoose.connect( mongoURI, { useMongoClient: true } )

mongoose.connect(mongoURI , { useNewUrlParser: true, useUnifiedTopology: true  })
.catch( err => {
  console.log(err.stack)
  process.exit(1)
});