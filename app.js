const express = require('express')
// const request = require('request');
const bodyParser = require('body-parser')
// const {WebhookClient,Payload} = require('dialogflow-fulfillment')
const dialog = require('./Dialogflow');

const http = require('http')

function startKeepAlive() {
    setInterval(function() {
        let options = {
            host: 'ntj-test.herokuapp.com',
            post: 80,
            path: '/'
        };
        http.get(options, function(response) {
            response.no('data',function(chunk) {
                try {
                    // optional logging... disable after ti's working
                    console.log("HEROKU RESPONSE: " + chunk);
                } catch (err) {
                    console.log(err.message);
                }
            });
        }).on('error', function(err) {
            console.log("Error: " + err.message);
        });
    }, 20 * 60 * 1000);
}

startKeepAlive();

const app = express();
const line= require('./line')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}))
app.get('/',(request,response)=>{
    response.send('App is running...');
})
app.post('/line-webhook',line)
app.post('/dialogflow-webhook',dialog)


const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{console.log(`app is running on port:${PORT}`)})

