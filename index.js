const Discord = require("discord.js");
require('events').EventEmitter.defaultMaxListeners = 300;
const client = new Discord.Client();
const mysql = require('mysql');
const prefix = "fb!";
const settings = require('./config.json');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'YOURDBPASSWORD',
  database : 'projectalpha'
});
//Make sure you put your MYSQL data in or it the bot wont work

const red = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,29,32,34,36];
const black = [2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35];
const dozen1 = [1,2,3,4,5,6,7,8,9,10,11,12];
const dozen2 = [13,14,15,16,17,18,19,20,21,22,23,24];
const dozen3 = [25,26,27,28,29,30,31,32,33,34,35,36];
const even = [2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36];
const odd = [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35];
const low = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
const high = [19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36];
const column1 = [1,4,7,10,13,16,19,22,25,28,31,34];
const column2 = [2,5,8,11,14,17,20,23,26,29,32,35];
const column3 = [3,6,9,12,15,18,21,24,27,30,33,36];
const totalbets = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','red','black','dozen1','dozen2','dozen3','even','odd','high','low','column1','column2','column3'];

client.on("ready", () => {
  console.log("I am ready!");
});
connection.connect(function(err, result) {
	console.log("Ready for your command!");
});

client.on("message", (message) => {
  if (message.content.startsWith("fb!bal")) {
let b = connection.query("SELECT balance FROM economy WHERE ID = ?;", message.author.id, function (err, result, fields){
	console.log(result); //Shows what result the query is getting
if (Object.keys(result).length === 0) {
	      let register ="INSERT INTO economy (ID, Balance) VALUES ('" + message.author.id + "', '0');";
		  connection.query(register)
	  	  				let nullEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setTitle(message.author.username)
	.setDescription("You do not have an account, one has been opened for you.");
	
	message.channel.send(nullEmbed);
} else {
	let balEmbed = new Discord.MessageEmbed()
	.setColor('#000099')
	.setTitle(message.author.username)
	.setDescription(result[0].balance + '€');
	
	message.channel.send(balEmbed);
}
})
  }
});

client.on("message", (message) => {
if (!message.content.startsWith(prefix) || message.author.bot) return;

const args = message.content.slice(prefix.length).trim().split(' ');
const command = args.shift().toLowerCase();

if (command === 'roulette') {
	if (!args.length) {
		return message.channel.send(`You didn't provide any bets, ${message.author}! The current available bets are: red, black, dozen1, dozen2, dozen3, even, odd, low, high, column1, column2, and column3.`);
	}
if (totalbets.includes(args[0])){
console.log("bet success");
let b = connection.query("SELECT balance FROM economy WHERE ID = ?;", message.author.id, function (err, result, fields){
	console.log(result); //Shows what result the query is getting
if (Object.keys(result).length === 0) {
	      let register ="INSERT INTO economy (ID, Balance) VALUES ('" + message.author.id + "', '0');";
		  connection.query(register)
	  	  				let nullEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setTitle(message.author.username)
	.setDescription("You do not have an account, one has been opened for you. Unfortunately this means you will not receive the winnings for this round.");
	
	message.channel.send(nullEmbed);
} else if (args[1] > result[0].balance || args[1] < 0 || args[1] > 100000){
		  				let nullEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setTitle(message.author.username)
	.setDescription("Insufficient Funds, You currently have: " + result[0].balance + "");
	
	message.channel.send(nullEmbed);
	message.channel.send("Note: Max bet is 100000")
} else {
let roulette1 = Math.floor(Math.random() * (36-0)) + 0;
	let roulette1Embed = new Discord.MessageEmbed()
	.setColor('#000099')
	.setTitle(message.author.username)
	.setDescription('The number is: ' + roulette1 + '');
	
	message.channel.send(roulette1Embed);
if (args[0] = 'red'){
	if (red.includes(roulette1) == true){
		let roulette1 = Math.floor(Math.random() * (36-0)) + 0;
	let wonEmbed = new Discord.MessageEmbed()
	.setColor('#009933')
	.setTitle(message.author.username)
	.setDescription("You Won " + args[1] * 2 + "");
	
	message.channel.send(wonEmbed);
		let sql5 = 'UPDATE economy SET Balance = Balance+' + args[1] * 2 + ' WHERE ID = ' + message.author.id + '';
		connection.query(sql5);
	} else {
					let lostEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setTitle(message.author.username)
	.setDescription("You Lost!");
	
	message.channel.send(lostEmbed);
		let sql5 = 'UPDATE economy SET Balance = Balance-' + args[1] + ' WHERE ID = ' + message.author.id + '';
		connection.query(sql5);
	}
} else if (args[0] = 'black'){
	if (black.includes(roulette1) == true){
			let wonEmbed = new Discord.MessageEmbed()
	.setColor('#009933')
	.setTitle(message.author.username)
	.setDescription("You Won " + args[1] * 2 + "");
	
	message.channel.send(wonEmbed);
		let sql5 = 'UPDATE economy SET Balance = Balance+' + args[1] * 2 + ' WHERE ID = ' + message.author.id + '';
		connection.query(sql5);
	} else {
					let lostEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setTitle(message.author.username)
	.setDescription("You Lost!");
	
	message.channel.send(lostEmbed);
		let sql5 = 'UPDATE economy SET Balance = Balance-' + args[1] + ' WHERE ID = ' + message.author.id + '';
		connection.query(sql5);
	}
} else if (args[0] = 'dozen1'){
	if (dozen1.includes(roulette1) == true){
			let wonEmbed = new Discord.MessageEmbed()
	.setColor('#009933')
	.setTitle(message.author.username)
	.setDescription("You Won " + args[1] * 3 + "");
	
	message.channel.send(wonEmbed);
		let sql5 = 'UPDATE economy SET Balance = Balance+' + args[1] * 2 + ' WHERE ID = ' + message.author.id + '';
		connection.query(sql5);
	} else {
					let lostEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setTitle(message.author.username)
	.setDescription("You Lost!");
	
	message.channel.send(lostEmbed);
		let sql5 = 'UPDATE economy SET Balance = Balance-' + args[1] + ' WHERE ID = ' + message.author.id + '';
		connection.query(sql5);
	}
} else if (args[0] = 'dozen2'){
	if (dozen2.includes(roulette1) == true){
			let wonEmbed = new Discord.MessageEmbed()
	.setColor('#009933')
	.setTitle(message.author.username)
	.setDescription("You Won " + args[1] * 3 + "");
	
	message.channel.send(wonEmbed);
		let sql5 = 'UPDATE economy SET Balance = Balance+' + args[1] * 2 + ' WHERE ID = ' + message.author.id + '';
		connection.query(sql5);
	} else {
					let lostEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setTitle(message.author.username)
	.setDescription("You Lost!");
	
	message.channel.send(lostEmbed);
		let sql5 = 'UPDATE economy SET Balance = Balance-' + args[1] + ' WHERE ID = ' + message.author.id + '';
		connection.query(sql5);
	}
} else if (args[0] = 'dozen3'){
	if (dozen3.includes(roulette1) == true){
			let wonEmbed = new Discord.MessageEmbed()
	.setColor('#009933')
	.setTitle(message.author.username)
	.setDescription("You Won " + args[1] * 3 + "");
	
	message.channel.send(wonEmbed);
		let sql5 = 'UPDATE economy SET Balance = Balance+' + args[1] * 2 + ' WHERE ID = ' + message.author.id + '';
		connection.query(sql5);
	} else {
					let lostEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setTitle(message.author.username)
	.setDescription("You Lost!");
	
	message.channel.send(lostEmbed);
		let sql5 = 'UPDATE economy SET Balance = Balance-' + args[1] + ' WHERE ID = ' + message.author.id + '';
		connection.query(sql5);
	}
} else if (args[0] = 'even'){
	if (even.includes(roulette1) == true){
			let wonEmbed = new Discord.MessageEmbed()
	.setColor('#009933')
	.setTitle(message.author.username)
	.setDescription("You Won " + args[1] * 2 + "");
	
	message.channel.send(wonEmbed);
		let sql5 = 'UPDATE economy SET Balance = Balance+' + args[1] * 2 + ' WHERE ID = ' + message.author.id + '';
		connection.query(sql5);
	} else {
					let lostEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setTitle(message.author.username)
	.setDescription("You Lost!");
	
	message.channel.send(lostEmbed);
		let sql5 = 'UPDATE economy SET Balance = Balance-' + args[1] + ' WHERE ID = ' + message.author.id + '';
		connection.query(sql5);
	}
} else if (args[0] = 'odd'){
	if (odd.includes(roulette1) == true){
			let wonEmbed = new Discord.MessageEmbed()
	.setColor('#009933')
	.setTitle(message.author.username)
	.setDescription("You Won " + args[1] * 2 + "");
	
	message.channel.send(wonEmbed);;
		let sql5 = 'UPDATE economy SET Balance = Balance+' + args[1] * 2 + ' WHERE ID = ' + message.author.id + '';
		connection.query(sql5);
	} else {
					let lostEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setTitle(message.author.username)
	.setDescription("You Lost!");
	
	message.channel.send(lostEmbed);
		let sql5 = 'UPDATE economy SET Balance = Balance-' + args[1] + ' WHERE ID = ' + message.author.id + '';
		connection.query(sql5);
	}
} else if (args[0] = 'low'){
	if (low.includes(roulette1) == true){
			let wonEmbed = new Discord.MessageEmbed()
	.setColor('#009933')
	.setTitle(message.author.username)
	.setDescription("You Won " + args[1] * 2 + "");
	
	message.channel.send(wonEmbed);
		let sql5 = 'UPDATE economy SET Balance = Balance+' + args[1] * 2 + ' WHERE ID = ' + message.author.id + '';
		connection.query(sql5);
	} else {
					let lostEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setTitle(message.author.username)
	.setDescription("You Lost!");
	
	message.channel.send(lostEmbed);
		let sql5 = 'UPDATE economy SET Balance = Balance-' + args[1] + ' WHERE ID = ' + message.author.id + '';
		connection.query(sql5);
	}
} else if (args[0] = 'high'){
	if (high.includes(roulette1) == true){
			let wonEmbed = new Discord.MessageEmbed()
	.setColor('#009933')
	.setTitle(message.author.username)
	.setDescription("You Won " + args[1] * 2 + "");
	
	message.channel.send(wonEmbed);
		let sql5 = 'UPDATE economy SET Balance = Balance+' + args[1] * 2 + ' WHERE ID = ' + message.author.id + '';
		connection.query(sql5);
	} else {
					let lostEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setTitle(message.author.username)
	.setDescription("You Lost!");
	
	message.channel.send(lostEmbed);
		let sql5 = 'UPDATE economy SET Balance = Balance-' + args[1] + ' WHERE ID = ' + message.author.id + '';
		connection.query(sql5);
	}
} else if (args[0] = 'column1'){
	if (column1.includes(roulette1) == true){
			let wonEmbed = new Discord.MessageEmbed()
	.setColor('#009933')
	.setTitle(message.author.username)
	.setDescription("You Won " + args[1] * 3 + "");
	
	message.channel.send(wonEmbed);
		let sql5 = 'UPDATE economy SET Balance = Balance+' + args[1] * 2 + ' WHERE ID = ' + message.author.id + '';
		connection.query(sql5);
	} else {
					let lostEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setTitle(message.author.username)
	.setDescription("You Lost!");
	
	message.channel.send(lostEmbed);
		let sql5 = 'UPDATE economy SET Balance = Balance-' + args[1] + ' WHERE ID = ' + message.author.id + '';
		connection.query(sql5);
	}
} else if (args[0] = 'column2'){
	if (column2.includes(roulette1) == true){
			let wonEmbed = new Discord.MessageEmbed()
	.setColor('#009933')
	.setTitle(message.author.username)
	.setDescription("You Won " + args[1] * 3 + "");
	
	message.channel.send(wonEmbed);
		let sql5 = 'UPDATE economy SET Balance = Balance+' + args[1] * 2 + ' WHERE ID = ' + message.author.id + '';
		connection.query(sql5);
	} else {
					let lostEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setTitle(message.author.username)
	.setDescription("You Lost!");
	
	message.channel.send(lostEmbed);
		let sql5 = 'UPDATE economy SET Balance = Balance-' + args[1] + ' WHERE ID = ' + message.author.id + '';
		connection.query(sql5);
	}
} else if (args[0] = 'column3'){
	if (column3.includes(roulette1) == true){
			let wonEmbed = new Discord.MessageEmbed()
	.setColor('#009933')
	.setTitle(message.author.username)
	.setDescription("You Won " + args[1] * 3 + "");
	
	message.channel.send(wonEmbed);
		let sql5 = 'UPDATE economy SET Balance = Balance+' + args[1] * 2 + ' WHERE ID = ' + message.author.id + '';
		connection.query(sql5);
	} else {
			let lostEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setTitle(message.author.username)
	.setDescription("You Lost!");
	
	message.channel.send(lostEmbed);
		let sql5 = 'UPDATE economy SET Balance = Balance-' + args[1] + ' WHERE ID = ' + message.author.id + '';
		connection.query(sql5);
	}
} else if (args[0] = roulette1){
		let wonEmbed = new Discord.MessageEmbed()
	.setColor('#009933')
	.setTitle(message.author.username)
	.setDescription("You Won " + args[1] * 35 + "");
	
	message.channel.send(wonEmbed);
	let sql5 = 'UPDATE economy SET Balance = Balance+' + args[1] * 35 + ' WHERE ID = ' + message.author.id + '';
	connection.query(sql5);
}

}
})
}	
}
});



client.on("message", (message) => {
  if (message.content.startsWith("fb!slots")) {
let c = connection.query("SELECT balance FROM economy WHERE ID = ?;", message.author.id, function (err, result, fields){
    if(result == 0) { 
      let register ="INSERT INTO economy (ID, Balance) VALUES ('" + message.author.id + "', '0');";
      connection.query(register)
      	  				let nullEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setTitle(message.author.username)
	.setDescription("You do not have an account, one has been opened for you. Unfortunately this means you will not receive the winnings for this round.");
	
	message.channel.send(nullEmbed);
    } else if (result[0].balance < 100){
				  				let nullEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setTitle(message.author.username)
	.setDescription("Insufficient Funds, You currently have: " + result[0].balance + "");
	
	message.channel.send(nullEmbed);
	} else {
      let success = 'UPDATE economy SET Balance = Balance-100 WHERE ID = ' + message.author.id + '';
      connection.query(success)
let slots1 = Math.floor(Math.random() * (3-0)) + 0;
let slots2 = Math.floor(Math.random() * (3-0)) + 0;
let slots3 = Math.floor(Math.random() * (3-0)) + 0;

var slot1VAR = 'NULL';
var slot2VAR = 'NULL';
var slot3VAR ='NULL';

if (slots1 == '0'){
slot1VAR = '🍎';
console.log('Red');
} else if (slots1 == '1'){
slot1VAR = '🍊';
console.log('Orange');
} else if (slots1 == '2'){
slot1VAR = '🍋';
console.log('Yellow');
}

if (slots2 == '0'){
slot2VAR = '🍎';
console.log('Red');
} else if (slots2 == '1'){
slot2VAR = '🍊';
console.log('Orange');
} else if (slots2 == '2'){
slot2VAR = '🍋';
console.log('Yellow');
}

if (slots3 == '0'){
slot3VAR = '🍎';
console.log('Red');
} else if (slots3 == '1'){
slot3VAR = '🍊';
console.log('Orange');
} else if (slots3 == '2'){
slot3VAR = '🍋';
console.log('Yellow');
}

		let slotEmbed = new Discord.MessageEmbed()
	.setColor('#000099')
	.setTitle(message.author.username)
	.setDescription(slot1VAR + ' ' + slot2VAR + ' ' + slot3VAR);
	
	message.channel.send(slotEmbed);
if (slots1 == '0' && slots2 == '0' && slots3 == '0'){
let euroreward = Math.floor(Math.random() * (50001)) + 0;
			let wonEmbed = new Discord.MessageEmbed()
	.setColor('#009933')
	.setTitle(message.author.username)
	.setDescription("Congrats, you won " + euroreward + "€!");
	
	message.channel.send(wonEmbed);
	let giveamount = result[0].balance + 25;
            let sql4 = 'UPDATE economy SET Balance = Balance+' + euroreward + ' WHERE ID = ' + message.author.id + '';
      connection.query(sql4);
let sql5  = 'UPDATE economy SET Balance = Balance-100 WHERE ID = ' + message.author.id + '';
      connection.query(sql5);
	  	console.log('User now has' + giveamount + '€');
console.log('Awarded ' + euroreward + ' Euros!');
    }

if (slots1 == '1' && slots2 == '1' && slots3 == '1'){
let euroreward = Math.floor(Math.random() * (50001)) + 0;
			let wonEmbed = new Discord.MessageEmbed()
	.setColor('#009933')
	.setTitle(message.author.username)
	.setDescription("Congrats, you won " + euroreward + "€!");
	
	message.channel.send(wonEmbed);
	let giveamount = result[0].balance + 25;
            let sql4 = 'UPDATE economy SET Balance = Balance+' + euroreward + ' WHERE ID = ' + message.author.id + '';
      connection.query(sql4);
	  	console.log('User now has' + giveamount + '€');
console.log('Awarded ' + euroreward + ' Euros!');
}
if (slots1 == '2' && slots2 == '2' && slots3 == '2'){
let euroreward = Math.floor(Math.random() * (50001)) + 0;
			let wonEmbed = new Discord.MessageEmbed()
	.setColor('#009933')
	.setTitle(message.author.username)
	.setDescription("Congrats, you won " + euroreward + "€!");
	
	message.channel.send(wonEmbed);
	let giveamount = result[0].balance + 25;
            let sql4 = 'UPDATE economy SET Balance = Balance+' + euroreward + ' WHERE ID = ' + message.author.id + '';
      connection.query(sql4);
	  	console.log('User now has' + giveamount + '€');
console.log('Awarded ' + euroreward + ' Euros!');
}
}
});
}
});

client.on("message", (message) => {
  if (message.content.startsWith("fb!work")) {
	const work = ["You work at a grocery store and earn ", "You work at a petrol station and ear ", "You work for at an amusement park and earn ", "You work at a prison and earn ", "You work at a restaurant and earn ", "You work at a hospital and earn ", "You work as a bus driver and earn "];
randomWork = work[Math.floor(Math.random() * work.length)];
	var euroreward = Math.floor(Math.random() *(1001)) + 0;
				let wonEmbed = new Discord.MessageEmbed()
	.setColor('#009933')
	.setTitle(message.author.username)
	.setDescription(randomWork + euroreward + "€");
	
	message.channel.send(wonEmbed);
let c = connection.query("SELECT balance FROM economy WHERE ID = ?;", message.author.id, function (err, result, fields){
    if(result == 0) { 
      let register ="INSERT INTO economy (ID, Balance) VALUES ('" + message.author.id + "', '0');";
      connection.query(register)
	  				let nullEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setTitle(message.author.username)
	.setDescription("You do not have an account, one has been opened for you. Unfortunately this means you will not receive the winnings for this round.");
	
	message.channel.send(nullEmbed);
    } else { 
	let giveamount = result[0].balance + euroreward
      let sql3 = 'UPDATE economy SET Balance = Balance+' + euroreward + ' WHERE ID = ' + message.author.id + '';
      connection.query(sql3);
	  	console.log('User now has' + giveamount + '€');
    }
	console.log('Awarded 25 Euros!');
});
}
});

client.on("message", (message) => {
  if (message.content.startsWith("fb!crime")) {
var succesrate = Math.floor(Math.random() * (6-0)) + 0;
console.log(succesrate); //Shows which selection is picked
if (succesrate == '0'){
	const rand1 = ["You robbed an old lady and gained 25€", "You successfully stole 25€ from a petrol station", "You successfully pickpocketed 25€ from a stranger on the bus", "You successfully knocked out a random man on the street and took his wallet gaining 25€", "You successfully screwed a random person on the street for 25€", "You steal a cell phone and sell it for 25€", "You take 25€ from the register at your job", "You rob a bank but only managed to grab 25€", "You scammed 25€ from a stranger on the street.", "You manage to steal a few candy bars from the petrol station and resell them for 25€"];
randomNumber1 = rand1[Math.floor(Math.random() * rand1.length)];
					let wonEmbed = new Discord.MessageEmbed()
	.setColor('#009933')
	.setTitle(message.author.username)
	.setDescription(randomNumber1);
	
	message.channel.send(wonEmbed);

let c = connection.query("SELECT balance FROM economy WHERE ID = ?;", message.author.id, function (err, result, fields){
    if(result == 0) { 
      let register ="INSERT INTO economy (ID, Balance) VALUES ('" + message.author.id + "', '0');";
      connection.query(register)
            	  				let nullEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setTitle(message.author.username)
	.setDescription("You do not have an account, one has been opened for you. Unfortunately this means you will not receive the winnings for this round.");
	
	message.channel.send(nullEmbed);
    } else { 
	let giveamount = result[0].balance + 25
      let sql3 = 'UPDATE economy SET Balance = Balance+25 WHERE ID = ' + message.author.id + '';
      connection.query(sql3);
	  	console.log('User now has' + giveamount + '€');
    }
	console.log('Awarded 25 Euros!');
});
}
}
if (succesrate == '1'){
	const rand2 = ["You beat down an old lady and took 5€", "You manage to pickpocket 5€ from a random stranger", "You manage to scam 5€ from a random stranger on the street.", "You take 5€ from the register when nobody is looking", "You created a fake scam project but only managed to get 5€.", "You rob a bank but had to flee with only 5€"];
	randomNumber2 = rand2[Math.floor(Math.random() * rand2.length)];
					let wonEmbed = new Discord.MessageEmbed()
	.setColor('#009933')
	.setTitle(message.author.username)
	.setDescription(randomNumber2);
	
	message.channel.send(wonEmbed);
	
	let c = connection.query("SELECT balance FROM economy WHERE ID = ?;", message.author.id, function (err, result, fields){
    if(result == 0) { 
      let register ="INSERT INTO economy (ID, Balance) VALUES ('" + message.author.id + "', '0');";
      connection.query(register)
            	  				let nullEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setTitle(message.author.username)
	.setDescription("You do not have an account, one has been opened for you. Unfortunately this means you will not receive the winnings for this round.");
	
	message.channel.send(nullEmbed);
    } else { 
	let giveamount = result[0].balance + 5
      let sql3 = 'UPDATE economy SET Balance = Balance+5 WHERE ID = ' + message.author.id + '';
      connection.query(sql3);
	  	console.log('User now has' + giveamount + '€');
    }
	console.log('Awarded 5 Euros!');
});
	
}
if (succesrate == '2'){
	const rand3 = ["You successfully robbed a bank gaining ", "You spend the night mugging random people and gain ", "You steal a few cell phones and manage to get ", "You created a scam project and managed to gain ", "You steal a bus and sell it for ", "You steal from the register and get ", "You beat an old lady down and take ", "When no one was looking you took from the register "];
	var euroreward = Math.floor(Math.random() * (50001-0)) + 0;
	randomNumber3 = rand3[Math.floor(Math.random() * rand3.length)];
						let wonEmbed = new Discord.MessageEmbed()
	.setColor('#009933')
	.setTitle(message.author.username)
	.setDescription(randomNumber3 + euroreward + "€");
	
	message.channel.send(wonEmbed);
	let c = connection.query("SELECT balance FROM economy WHERE ID = ?;", message.author.id, function (err, result, fields){
    if(result == 0) { 
      let register ="INSERT INTO economy (ID, Balance) VALUES ('" + message.author.id + "', '0');";
      connection.query(register)
            	  				let nullEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setTitle(message.author.username)
	.setDescription("You do not have an account, one has been opened for you. Unfortunately this means you will not receive the winnings for this round.");
	
	message.channel.send(nullEmbed);
    } else { 
	let giveamount = result[0].balance + euroreward
      let sql3 = 'UPDATE economy SET Balance = Balance+' + euroreward + ' WHERE ID = ' + message.author.id + '';
      connection.query(sql3);
	  	console.log('User now has ' + giveamount + '€');
    }
	console.log('Awarded ' + euroreward + ' Euros!');
});
		
}
if (succesrate == '3'){
	const rand4 = ["You tried to steal from the register but got beaten down by an employee", "You tried to pickpocket a stranger on the street but got tased", "You try to rob an old lady but she fought back hard", "You try to create a scam project but it was taken down", "You steal a few cell phones but UH OH! they were tracked to you", "You try to rob a bank but got taken down by security", "You try to steal a few candy bars from the petrol station but forget they have security cameras!", "You try to knock a stranger on the street out but got knocked out tripping on the sidewalk"];
	randomNumber4 = rand4[Math.floor(Math.random() * rand4.length)];
							let lostEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setTitle(message.author.username)
	.setDescription(randomNumber4);
	
	message.channel.send(lostEmbed);
  }
if (succesrate == '4'){
	const rand5 = ["You tried to rob a bank but instead got sent to prison and fined ", "You try to steal a traffic cone and get fined ", "You break several traffic laws and get fined ", "You try mugging a stranger but he knocks you down and steals your money, you lost ", "You try to rob a house but are jumped by a naked man chasing while screeching, while running in horror you drop ", "You try to sell drugs to little kids when you are busted by the Polzei. You are sent to prison and fined ", "You try to pickpocket people on the bus when someone notices and beats you down. While sobbing and running as fast as you can off the bus you drop "];
	randomNumber5 = rand5[Math.floor(Math.random() * rand5.length)];
	var euroreward2 = Math.floor(Math.random() *(50001)) + 0;
								let lostEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setTitle(message.author.username)
	.setDescription(randomNumber5 + euroreward2 + "€");
	
	message.channel.send(lostEmbed);
	let c = connection.query("SELECT balance FROM economy WHERE ID = ?;", message.author.id, function (err, result, fields){
    if(result == 0) { 
      let register ="INSERT INTO economy (ID, Balance) VALUES ('" + message.author.id + "', '0');";
      connection.query(register)
           	  				let nullEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setTitle(message.author.username)
	.setDescription("You do not have an account, one has been opened for you. Unfortunately this means you will not receive the winnings for this round.");
	
	message.channel.send(nullEmbed);
    } else { 
	let giveamount = result[0].balance + euroreward2 //This sets the value to send to console.log
      let sql3 = 'UPDATE economy SET Balance = Balance-' + euroreward2 + ' WHERE ID = ' + message.author.id + '';
      connection.query(sql3);
	  	console.log('User now has' + giveamount + '€'); //This shows the console what the user now has
    }
	console.log('Awarded '+ euroreward2 + ' Euros!'); //This shows console what was rewarded
});
}
if (succesrate == '5'){
	const rand6 = ["You tried to rob a bank but get arrested!", "You beat up a homeless man but the Polizei was near and caught you!", "You try to sell fake phones to the elderly but get caught by an undercover Polizei JAILED!", "You try to rob a house but get subdued by a huge man, JAILED!"];
	randomnumber6 = rand6[Math.floor(Math.random() * rand6.length)];
        							let lostEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setTitle(message.author.username)
	.setDescription(randomnumber6);
	
	message.channel.send(lostEmbed);
}
}
);

client.login(settings.token);










