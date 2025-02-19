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

console.log(Date(2025-1-1))
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/:date?",(req,res)=>{
  let date=req.params.date
  let utc;
  let unix;
  let isInvalid=false;
  let isEmpty=false;
  //check if empty
  if(date===undefined){
    isEmpty=true}
  
  //if not unix
  if(isNaN(date)){
    utc=new Date(date).toUTCString()
    unix=new Date(date).getTime() 
    if(utc==="Invalid Date"){
      isInvalid=true
    }
  }
  //if unix
  else{
  unix=req.params.date
  utc=new Date(Number(unix)).toUTCString()
  }
  //outputs
  if(isEmpty){
    utc=Date()
    unix=new Date().getTime()
    res.json({
    "unix": Number(unix),
    "utc": utc
      })
  }
  else
  if(isInvalid){
    res.json({"error": "Invalid Date"})
  }
  else{
    res.json({
    "unix": Number(unix),
    "utc": utc
      })
    } 
    
})



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
