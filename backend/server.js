
const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db.js')
const app            = express();
const port = 3005;

app.use(bodyParser.urlencoded({extended: true}))

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);

    // Pass to next layer of middleware
    next();
});

MongoClient.connect(db.url, (err,client)=>{
  
    var db = client.db('spanishteachers');

    if (err) {
    return console.log(err);
    }


// Connect to the db
// MongoClient.connect("mongodb://steven:steven123@ds163014.mlab.com:63014/spanishteachers", function(err, db) {
//   if(!err) {
//     console.log("We are connected");
//   }
// });
    require('./app/routes')(app,db);
    app.listen(port, ()=> {
        console.log("we are live on : "+ port);
    })
  })
