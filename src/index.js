var app = require('./express');
var http = require('http');

const server = http.createServer(app);


// console.log(env);
const PORT = process.env.PORT;

server.listen(PORT);

server.on('listening', ()=>{
    console.log(`Listening on port ${PORT}`);
});