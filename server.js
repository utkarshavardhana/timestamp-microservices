// server.js
// where your node app starts

// init project
var express = require('express');
var moment = require('moment');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/timestamp', function (req, res) {
  var myMoment = moment(new Date());
  myMoment.toDate().toUTCString();
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({
    unix: myMoment.valueOf(),
    utc: myMoment.format('ddd, DD MMM YYYY HH:mm:ss') + ' GMT'
  }));
});
// your first API endpoint... 
app.get('/api/timestamp/:date', function (req, res) {
  var myDate = Number(req.params.date);
  var myMoment = moment(isNaN(myDate) ? req.params.date : myDate);
  myMoment.toDate().toUTCString();
  if(Date.parse(myMoment))
  {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
      unix: myMoment.valueOf(),
      utc: myMoment.format('ddd, DD MMM YYYY HH:mm:ss') + ' GMT'
    }));
  }
  else {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
      error: 'Invalid Date'
    }));
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});