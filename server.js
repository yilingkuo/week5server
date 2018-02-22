var express = require('express');
var app=express();

var https=require('https');
var fs=require('fs')
var privateKey = fs.readFileSync('/home/studentuser/certs/client-key.pem').toString();
var certificate = fs.readFileSync('/home/studentuser/certs/client-cert.pem').toString();
var credentials ={key: privateKey, cert: certificate};
var httpsServer = https.createServer(credentials, app);
httpsServer.listen(4443);

app.get('/index.html',function(req,res){
	//run some server-side code
	console.log('the server has received a request');
	console.log('index.html requested');
	res.sendFile(__dirname + '/index.html'); 
});