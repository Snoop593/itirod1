const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const fs = require('fs');
const port = 3000;

server.listen(port); 
app.use(express.static(__dirname + '/public'));

let names = ["БОМЖ","ОпА$нЫй_ВоЗрА$т","ПуЛя_В_гЛаЗ_и_Ты_УнИТаЗ","Не_ежык_но_в_тумане","COCOK_B_NOCOK","CbIpOCTb_oT_HoCkA","100pudoff",
"Mr.ПеLьМЕshKa","Ǿग₳₡Ħ₳я Ҕ₳Ҕ₳","Сильвестр в столовой"]

io.on('connection',socket=>{
	let name = `${names[ran(0,9)]} ${ran(0,100)}`
	socket.broadcast.emit('newUser',name)
	socket.emit('userName',name,fs.readFileSync("public/data.json", "utf8"))
	toJSON({name,msg:"Зашел в чат",date: new Date()})
	socket.on('message',msg=>{
		toJSON({name,msg,date: new Date()})
		io.sockets.emit('messageToClients', msg, name);
	})
	socket.on('leave',name=>{
		toJSON({name,msg:"Вышел из чата",date: new Date()})
		io.sockets.emit('leaveToClients',name)
	})
})

function toJSON({name,msg,date}){
	let data = fs.readFileSync("public/data.json", "utf8");
	let json = null;
	if(!data) json = {values:[]}
	else json = JSON.parse(data)
	json.values.push({name,msg,date})
	data = JSON.stringify(json)
	fs.writeFileSync("public/data.json", data)
}

function ran(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
