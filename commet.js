// Create web server
const express = require('express');
const app = express();

// Set view engine
app.set('view engine', 'ejs');

// Set static file
app.use(express.static('public'));

// Set body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Set mongodb
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'comet';
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
let db, collection;
client.connect(function (err) {
  if (err) {
    return console.log(err);
  }
  console.log('MongoDB connected successfully');
  db = client.db(dbName);
  collection = db.collection('comments');
});

// Set server
app.listen(8080, function () {
  console.log('Server running at http://localhost:8080');
}
)
