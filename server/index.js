const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'../client/dist')));
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../client/dist/index.html'));
});
const server = http.createServer(app);
server.listen(3000, ()=>{
    console.log('Meme-Generator is running on port:3000');
});