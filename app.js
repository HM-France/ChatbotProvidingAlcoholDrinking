const express = require('express')
// const request = require('request');
const bodyParser = require('body-parser')
// const {WebhookClient,Payload} = require('dialogflow-fulfillment')
const dialog = require('./Dialogflow');


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

