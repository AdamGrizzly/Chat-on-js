var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var count = 1;
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd = '0'+dd
} 

if(mm<10) {
    mm = '0'+mm
} 

today = mm + '/' + dd + '/' + yyyy;
console.log(today);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('Пользователь присоединился '+count++);
  socket.on('disconnect', function(){
    console.log('пользователь отсоединился '+count--);
  });
});
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});
http.listen(3000, function(){
  console.log('listening on *:3000');
});