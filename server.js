var express = require('express')
var app = express()
var bodyParser = require('body-parser');

var authToken = 'a08a2c86eb20e3d906b86f513f756c1c';
var accountNumber = 'AC0e9caf6b72ec9f3ea7cdf8177c9c216c';
var twilio = require('twilio')(accountNumber, authToken);
var fromNumber = '13317033163';
var messageCode;

var sendMessage = function(code, number){
   const messageText = "Your verification Code is " + code;
   twilio.messages.create({
       to: "+"+ number,
       from: fromNumber,
       body: messageText,
   }, function(err, message) {
       console.log(err)
       console.log(message);
   });
}

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))
app.use(bodyParser({limit: '100mb'}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
}));

const MessagingResponse = require('twilio').twiml.MessagingResponse;


app.get('/', function(request, response) {
 response.send('Hello World!')
})

app.post('/message', (req, res) => {
    messageCode =  Math.floor(100000 + Math.random() * 900000);
    console.log(req.body.number);
    sendMessage(messageCode,req.body.number);
    res.send(""+ messageCode);
})

app.listen(app.get('port'), function() {
 console.log("Node app is running at localhost:" + app.get('port'))
})
