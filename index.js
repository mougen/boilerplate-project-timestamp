// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// default date endpoint
app.get("/api", function (req, res) {
  // const date = new Date(Date.now())
  res.json(dateObject(Date.now()));
});

// epoch date endpoint
app.get("/api/:time([0-9]+)", function (req, res) {
  // const date = new Date(Number(req.params.time))
  res.json(dateObject(Number(req.params.time)));
});

// date endpoint
app.get("/api/:time", function (req, res) {
  // const date = new Date(req.params.time)
  // console.log(date)
  res.json(dateObject(req.params.time));
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});



function dateObject(input) {
  const date = new Date(input)
  if (isNaN(date)) return {"error": "Invalid Date"}
 
  return {
    'unix': date.getTime(),
    "utc": date.toUTCString()
  }
}