const Discord = require("discord.js");
const bigInt = require("big-integer");
require('events').EventEmitter.defaultMaxListeners = 300;
const client = new Discord.Client();
const mysql = require('mysql');
const prefix = "!";
const settings = require('./config.json');
function toFixed(x) {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split('e-')[1]);
    if (e) {
        x *= Math.pow(10,e-1);
        x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
    }
  } else {
    var e = parseInt(x.toString().split('+')[1]);
    if (e > 20) {
        e -= 20;
        x /= Math.pow(10,e);
        x += (new Array(e+1)).join('0');
    }
  }
  return x;
}
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'DBPASSWORD',
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
const jailed = new Set(); //This gives functionality to the crimed jailed part
const crimedown = new Set(); //This adds the cooldown to the crime command
const workdown = new Set(); //This adds the cooldown to the work command
const slotdown = new Set(); //This adds the cooldown to the slots command
const bjdown = new Set(); //This adds the cooldown to the bj command
const bj = new Set(); 
var bjactive = false;
var globalvalue = 0
var dealervalue = 0
var moneyvalue = 0
client.on("ready", () => {
  console.log("I am ready!");
});
connection.connect(function(err, result) {
	console.log("Ready for your command!");
});

client.on("message", (message) => {
  if (message.content.startsWith(prefix + "bal")) {
let b = connection.query("SELECT balance, bank FROM economy WHERE ID = ?;", message.author.id, function (err, result, fields){
	console.log(result); //Shows what result the query is getting
if (Object.keys(result).length === 0) {
	      let register ="INSERT INTO economy (ID, Balance, Bank,username) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "');";
		  connection.query(register)
	  	  				let nullEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription("You do not have an account, one has been opened for you.");
	
	message.channel.send(nullEmbed);
} else {
	let balEmbed = new Discord.MessageEmbed()
	.setColor('#000099')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.addFields(
	{ name: ':euro: Euros', value: result[0].balance, inline: true },
		{ name: ':bank: Bank', value : result[0].bank, inline: true }
		)
		.setTimestamp()
		.setFooter('Project Alpha');
	
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
		  if(jailed.has(message.author.id)){
	let jailEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription("You have been jailed, please wait 5 minutes from the jailing to continue");
	message.channel.send(jailEmbed);
	  } else {
	if (!args.length) {
		return message.channel.send(`You didn't provide any bets, ${message.author}! The current available bets are: red, black, dozen1, dozen2, dozen3, even, odd, low, high, column1, column2, and column3.`);
	}
if (totalbets.includes(args[0])){
console.log("bet success");
let b = connection.query("SELECT balance FROM economy WHERE ID = ?;", message.author.id, function (err, result, fields){
	console.log(result); //Shows what result the query is getting
if (Object.keys(result).length === 0) {
	      let register ="INSERT INTO economy (ID, Balance, Bank,username) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "');";
		  connection.query(register)
	  	  				let nullEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription("You do not have an account, one has been opened for you. Unfortunately this means you will not receive the winnings for this round.");
	
	message.channel.send(nullEmbed);
} else if (args[1] > result[0].balance || args[1] < 0){
		  				let nullEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription("Insufficient Funds, You currently have: " + result[0].balance + "");
	
	message.channel.send(nullEmbed);
} else {
let roulette1 = Math.floor(Math.random() * (36-0)) + 0;
	let roulette1Embed = new Discord.MessageEmbed()
	.setColor('#000099')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription('The number is: ' + roulette1 + '');
	
	message.channel.send(roulette1Embed);
if (args[0] = 'red'){
	if (red.includes(roulette1) == true){
		let roulette1 = Math.floor(Math.random() * (36-0)) + 0;
	let wonEmbed = new Discord.MessageEmbed()
	.setColor('#009933')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription("You Won " + args[1] * 2 + "");
	
	message.channel.send(wonEmbed);
		let sql5 = 'UPDATE economy SET Balance = Balance+' + args[1] * 2 + ' WHERE ID = ' + message.author.id + '';
		connection.query(sql5);
	} else {
					let lostEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription("You Lost!");
	
	message.channel.send(lostEmbed);
		let sql5 = 'UPDATE economy SET Balance = Balance-' + args[1] + ' WHERE ID = ' + message.author.id + '';
		connection.query(sql5);
	}
} else if (args[0] = 'black'){
	if (black.includes(roulette1) == true){
			let wonEmbed = new Discord.MessageEmbed()
	.setColor('#009933')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription("You Won " + args[1] * 2 + "");
	
	message.channel.send(wonEmbed);
		let sql5 = 'UPDATE economy SET Balance = Balance+' + args[1] * 2 + ' WHERE ID = ' + message.author.id + '';
		connection.query(sql5);
	} else {
					let lostEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription("You Lost!");
	
	message.channel.send(lostEmbed);
		let sql5 = 'UPDATE economy SET Balance = Balance-' + args[1] + ' WHERE ID = ' + message.author.id + '';
		connection.query(sql5);
	}
} else if (args[0] = 'dozen1'){
	if (dozen1.includes(roulette1) == true){
			let wonEmbed = new Discord.MessageEmbed()
	.setColor('#009933')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription("You Won " + args[1] * 3 + "");
	
	message.channel.send(wonEmbed);
		let sql5 = 'UPDATE economy SET Balance = Balance+' + args[1] * 2 + ' WHERE ID = ' + message.author.id + '';
		connection.query(sql5);
	} else {
					let lostEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription("You Lost!");
	
	message.channel.send(lostEmbed);
		let sql5 = 'UPDATE economy SET Balance = Balance-' + args[1] + ' WHERE ID = ' + message.author.id + '';
		connection.query(sql5);
	}
} else if (args[0] = 'dozen2'){
	if (dozen2.includes(roulette1) == true){
			let wonEmbed = new Discord.MessageEmbed()
	.setColor('#009933')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription("You Won " + args[1] * 3 + "");
	
	message.channel.send(wonEmbed);
		let sql5 = 'UPDATE economy SET Balance = Balance+' + args[1] * 2 + ' WHERE ID = ' + message.author.id + '';
		connection.query(sql5);
	} else {
					let lostEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription("You Lost!");
	
	message.channel.send(lostEmbed);
		let sql5 = 'UPDATE economy SET Balance = Balance-' + args[1] + ' WHERE ID = ' + message.author.id + '';
		connection.query(sql5);
	}
} else if (args[0] = 'dozen3'){
	if (dozen3.includes(roulette1) == true){
			let wonEmbed = new Discord.MessageEmbed()
	.setColor('#009933')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription("You Won " + args[1] * 3 + "");
	
	message.channel.send(wonEmbed);
		let sql5 = 'UPDATE economy SET Balance = Balance+' + args[1] * 2 + ' WHERE ID = ' + message.author.id + '';
		connection.query(sql5);
	} else {
					let lostEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription("You Lost!");
	
	message.channel.send(lostEmbed);
		let sql5 = 'UPDATE economy SET Balance = Balance-' + args[1] + ' WHERE ID = ' + message.author.id + '';
		connection.query(sql5);
	}
} else if (args[0] = 'even'){
	if (even.includes(roulette1) == true){
			let wonEmbed = new Discord.MessageEmbed()
	.setColor('#009933')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription("You Won " + args[1] * 2 + "");
	
	message.channel.send(wonEmbed);
		let sql5 = 'UPDATE economy SET Balance = Balance+' + args[1] * 2 + ' WHERE ID = ' + message.author.id + '';
		connection.query(sql5);
	} else {
					let lostEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription("You Lost!");
	
	message.channel.send(lostEmbed);
		let sql5 = 'UPDATE economy SET Balance = Balance-' + args[1] + ' WHERE ID = ' + message.author.id + '';
		connection.query(sql5);
	}
} else if (args[0] = 'odd'){
	if (odd.includes(roulette1) == true){
			let wonEmbed = new Discord.MessageEmbed()
	.setColor('#009933')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription("You Won " + args[1] * 2 + "");
	
	message.channel.send(wonEmbed);;
		let sql5 = 'UPDATE economy SET Balance = Balance+' + args[1] * 2 + ' WHERE ID = ' + message.author.id + '';
		connection.query(sql5);
	} else {
					let lostEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription("You Lost!");
	
	message.channel.send(lostEmbed);
		let sql5 = 'UPDATE economy SET Balance = Balance-' + args[1] + ' WHERE ID = ' + message.author.id + '';
		connection.query(sql5);
	}
} else if (args[0] = 'low'){
	if (low.includes(roulette1) == true){
			let wonEmbed = new Discord.MessageEmbed()
	.setColor('#009933')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription("You Won " + args[1] * 2 + "");
	
	message.channel.send(wonEmbed);
		let sql5 = 'UPDATE economy SET Balance = Balance+' + args[1] * 2 + ' WHERE ID = ' + message.author.id + '';
		connection.query(sql5);
	} else {
					let lostEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription("You Lost!");
	
	message.channel.send(lostEmbed);
		let sql5 = 'UPDATE economy SET Balance = Balance-' + args[1] + ' WHERE ID = ' + message.author.id + '';
		connection.query(sql5);
	}
} else if (args[0] = 'high'){
	if (high.includes(roulette1) == true){
			let wonEmbed = new Discord.MessageEmbed()
	.setColor('#009933')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription("You Won " + args[1] * 2 + "");
	
	message.channel.send(wonEmbed);
		let sql5 = 'UPDATE economy SET Balance = Balance+' + args[1] * 2 + ' WHERE ID = ' + message.author.id + '';
		connection.query(sql5);
	} else {
					let lostEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription("You Lost!");
	
	message.channel.send(lostEmbed);
		let sql5 = 'UPDATE economy SET Balance = Balance-' + args[1] + ' WHERE ID = ' + message.author.id + '';
		connection.query(sql5);
	}
} else if (args[0] = 'column1'){
	if (column1.includes(roulette1) == true){
			let wonEmbed = new Discord.MessageEmbed()
	.setColor('#009933')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription("You Won " + args[1] * 3 + "");
	
	message.channel.send(wonEmbed);
		let sql5 = 'UPDATE economy SET Balance = Balance+' + args[1] * 2 + ' WHERE ID = ' + message.author.id + '';
		connection.query(sql5);
	} else {
					let lostEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription("You Lost!");
	
	message.channel.send(lostEmbed);
		let sql5 = 'UPDATE economy SET Balance = Balance-' + args[1] + ' WHERE ID = ' + message.author.id + '';
		connection.query(sql5);
	}
} else if (args[0] = 'column2'){
	if (column2.includes(roulette1) == true){
			let wonEmbed = new Discord.MessageEmbed()
	.setColor('#009933')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription("You Won " + args[1] * 3 + "");
	
	message.channel.send(wonEmbed);
		let sql5 = 'UPDATE economy SET Balance = Balance+' + args[1] * 2 + ' WHERE ID = ' + message.author.id + '';
		connection.query(sql5);
	} else {
					let lostEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription("You Lost!");
	
	message.channel.send(lostEmbed);
		let sql5 = 'UPDATE economy SET Balance = Balance-' + args[1] + ' WHERE ID = ' + message.author.id + '';
		connection.query(sql5);
	}
} else if (args[0] = 'column3'){
	if (column3.includes(roulette1) == true){
			let wonEmbed = new Discord.MessageEmbed()
	.setColor('#009933')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription("You Won " + args[1] * 3 + "");
	
	message.channel.send(wonEmbed);
		let sql5 = 'UPDATE economy SET Balance = Balance+' + args[1] * 2 + ' WHERE ID = ' + message.author.id + '';
		connection.query(sql5);
	} else {
			let lostEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription("You Lost!");
	
	message.channel.send(lostEmbed);
		let sql5 = 'UPDATE economy SET Balance = Balance-' + args[1] + ' WHERE ID = ' + message.author.id + '';
		connection.query(sql5);
	}
} else if (args[0] = roulette1){
		let wonEmbed = new Discord.MessageEmbed()
	.setColor('#009933')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription("You Won " + args[1] * 35 + "");
	
	message.channel.send(wonEmbed);
	let sql5 = 'UPDATE economy SET Balance = Balance+' + args[1] * 35 + ' WHERE ID = ' + message.author.id + '';
	connection.query(sql5);
}

}
})
}	
}
}
});



client.on("message", (message) => {
  if (message.content.startsWith(prefix + "slots")) {
	  	  if(jailed.has(message.author.id)){
	let jailEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription("You have been jailed, please wait 5 minutes from the jailing to continue");
	message.channel.send(jailEmbed);
	  } else if (slotdown.has(message.author.id)) {
		  	let coolEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription("Please wait 1 minute before using this command again");
	message.channel.send(coolEmbed);
	  } else {
let c = connection.query("SELECT balance FROM economy WHERE ID = ?;", message.author.id, function (err, result, fields){
    if(result == 0) { 
      let register ="INSERT INTO economy (ID, Balance, Bank,username) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "');";
      connection.query(register)
      	  				let nullEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription("You do not have an account, one has been opened for you. Unfortunately this means you will not receive the winnings for this round.");
	
	message.channel.send(nullEmbed);
    } else if (result[0].balance < 100){
				  				let jailEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription("Insufficient Funds, You currently have: " + result[0].balance + "");
	
	message.channel.send(jailEmbed);
	} else {
      let success = 'UPDATE economy SET Balance = Balance-100 WHERE ID = ' + message.author.id + '';
	  				slotdown.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          slotdown.delete(message.author.id);
        }, 60000);
      connection.query(success)
let slots1 = Math.floor(Math.random() * (3-0)) + 0;
let slots2 = Math.floor(Math.random() * (3-0)) + 0;
let slots3 = Math.floor(Math.random() * (3-0)) + 0;
let slots4 = Math.floor(Math.random() * (3-0)) + 0;
let slots5 = Math.floor(Math.random() * (3-0)) + 0;

var slot1VAR = 'NULL';
var slot2VAR = 'NULL';
var slot3VAR ='NULL';
var slot4VAR = 'NULL';
var slot5VAR ='NULL';

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

if (slots4 == '0'){
	slot4VAR = '🍎';
	console.log('Red');
	} else if (slots4 == '1'){
	slot4VAR = '🍊';
	console.log('Orange');
	} else if (slots4 == '2'){
	slot4VAR = '🍋';
	console.log('Yellow');
	}

	if (slots5 == '0'){
		slot5VAR = '🍎';
		console.log('Red');
		} else if (slots5 == '1'){
		slot5VAR = '🍊';
		console.log('Orange');
		} else if (slots5 == '2'){
		slot5VAR = '🍋';
		console.log('Yellow');
		}

		let slotEmbed = new Discord.MessageEmbed()
	.setColor('#000099')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription(slot1VAR + ' ' + slot2VAR + ' ' + slot3VAR + ' ' + slot4VAR + ' ' + slot5VAR);
	
	message.channel.send(slotEmbed);
if (slots1 == '0' && slots2 == '0' && slots3 == '0' && slots4 == '0' && slots5 == '0'){
let euroreward = Math.floor(Math.random() * (100001)) + 0;
			let wonEmbed = new Discord.MessageEmbed()
	.setColor('#009933')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
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

if (slots1 == '1' && slots2 == '1' && slots3 == '1' && slots4 == '1' && slots5 == '1'){
let euroreward = Math.floor(Math.random() * (40001)) + 0;
			let wonEmbed = new Discord.MessageEmbed()
	.setColor('#009933')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription("Congrats, you won " + euroreward + "€!");
	
	message.channel.send(wonEmbed);
	let giveamount = result[0].balance + 25;
            let sql4 = 'UPDATE economy SET Balance = Balance+' + euroreward + ' WHERE ID = ' + message.author.id + '';
      connection.query(sql4);
	  	console.log('User now has' + giveamount + '€');
console.log('Awarded ' + euroreward + ' Euros!');
}
if (slots1 == '2' && slots2 == '2' && slots3 == '2' && slots4 == '2' && slots5 == '2'){
let euroreward = Math.floor(Math.random() * (40001)) + 0;
			let wonEmbed = new Discord.MessageEmbed()
	.setColor('#009933')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription("Congrats, you won " + euroreward + "€!");
	
	message.channel.send(wonEmbed);
	let giveamount = result[0].balance + 25;
            let sql4 = 'UPDATE economy SET Balance = Balance+' + euroreward + ' WHERE ID = ' + message.author.id + '';
      connection.query(sql4);
	  	console.log('User now has' + giveamount + '€');
console.log('Awarded ' + euroreward + ' Euros!');
}
if (slots1 != '0' && slots2 == '0' && slots3 == '0' && slots4 == '0' && slots5 != '0'){
	let euroreward = Math.floor(Math.random() * (20001)) + 0;
				let wonEmbed = new Discord.MessageEmbed()
		.setColor('#009933')
		.setAuthor(message.author.username)
		.setThumbnail(message.author.avatarURL({ dynamic:true }))
		.setDescription("Congrats, you won " + euroreward + "€!");
		
		message.channel.send(wonEmbed);
		let giveamount = result[0].balance + 25;
				let sql4 = 'UPDATE economy SET Balance = Balance+' + euroreward + ' WHERE ID = ' + message.author.id + '';
		  connection.query(sql4);
			  console.log('User now has' + giveamount + '€');
	console.log('Awarded ' + euroreward + ' Euros!');
	}
	if (slots1 != '1' && slots2 == '1' && slots3 == '1' && slots4 == '1' && slots5 != '1'){
		let euroreward = Math.floor(Math.random() * (20001)) + 0;
					let wonEmbed = new Discord.MessageEmbed()
			.setColor('#009933')
			.setAuthor(message.author.username)
			.setThumbnail(message.author.avatarURL({ dynamic:true }))
			.setDescription("Congrats, you won " + euroreward + "€!");
			
			message.channel.send(wonEmbed);
			let giveamount = result[0].balance + 25;
					let sql4 = 'UPDATE economy SET Balance = Balance+' + euroreward + ' WHERE ID = ' + message.author.id + '';
			  connection.query(sql4);
				  console.log('User now has' + giveamount + '€');
		console.log('Awarded ' + euroreward + ' Euros!');
		}
		if (slots1 != '2' && slots2 == '2' && slots3 == '2' && slots4 == '2' && slots5 != '2'){
			let euroreward = Math.floor(Math.random() * (20001)) + 0;
						let wonEmbed = new Discord.MessageEmbed()
				.setColor('#009933')
				.setAuthor(message.author.username)
				.setThumbnail(message.author.avatarURL({ dynamic:true }))
				.setDescription("Congrats, you won " + euroreward + "€!");
				
				message.channel.send(wonEmbed);
				let giveamount = result[0].balance + 25;
						let sql4 = 'UPDATE economy SET Balance = Balance+' + euroreward + ' WHERE ID = ' + message.author.id + '';
				  connection.query(sql4);
					  console.log('User now has' + giveamount + '€');
			console.log('Awarded ' + euroreward + ' Euros!');
			}
			if (slots1 == '0' && slots2 == '0' && slots3 == '0' && slots4 != '0'){
				let euroreward = Math.floor(Math.random() * (20001)) + 0;
							let wonEmbed = new Discord.MessageEmbed()
					.setColor('#009933')
					.setAuthor(message.author.username)
					.setThumbnail(message.author.avatarURL({ dynamic:true }))
					.setDescription("Congrats, you won " + euroreward + "€!");
					
					message.channel.send(wonEmbed);
					let giveamount = result[0].balance + 25;
							let sql4 = 'UPDATE economy SET Balance = Balance+' + euroreward + ' WHERE ID = ' + message.author.id + '';
					  connection.query(sql4);
						  console.log('User now has' + giveamount + '€');
				console.log('Awarded ' + euroreward + ' Euros!');
				}
				if (slots1 == '1' && slots2 == '1' && slots3 == '1' && slots4 != '1'){
					let euroreward = Math.floor(Math.random() * (20001)) + 0;
								let wonEmbed = new Discord.MessageEmbed()
						.setColor('#009933')
						.setAuthor(message.author.username)
						.setThumbnail(message.author.avatarURL({ dynamic:true }))
						.setDescription("Congrats, you won " + euroreward + "€!");
						
						message.channel.send(wonEmbed);
						let giveamount = result[0].balance + 25;
								let sql4 = 'UPDATE economy SET Balance = Balance+' + euroreward + ' WHERE ID = ' + message.author.id + '';
						  connection.query(sql4);
							  console.log('User now has' + giveamount + '€');
					console.log('Awarded ' + euroreward + ' Euros!');
					}
					if (slots1 == '2' && slots2 == '2' && slots3 == '2' && slots4 != '2'){
						let euroreward = Math.floor(Math.random() * (20001)) + 0;
									let wonEmbed = new Discord.MessageEmbed()
							.setColor('#009933')
							.setAuthor(message.author.username)
							.setThumbnail(message.author.avatarURL({ dynamic:true }))
							.setDescription("Congrats, you won " + euroreward + "€!");
							
							message.channel.send(wonEmbed);
							let giveamount = result[0].balance + 25;
									let sql4 = 'UPDATE economy SET Balance = Balance+' + euroreward + ' WHERE ID = ' + message.author.id + '';
							  connection.query(sql4);
								  console.log('User now has' + giveamount + '€');
						console.log('Awarded ' + euroreward + ' Euros!');
						}
						if (slots2 != '0' && slots3 == '0' && slots4 == '0' && slots5 == '0'){
							let euroreward = Math.floor(Math.random() * (20001)) + 0;
										let wonEmbed = new Discord.MessageEmbed()
								.setColor('#009933')
								.setAuthor(message.author.username)
								.setThumbnail(message.author.avatarURL({ dynamic:true }))
								.setDescription("Congrats, you won " + euroreward + "€!");
								
								message.channel.send(wonEmbed);
								let giveamount = result[0].balance + 25;
										let sql4 = 'UPDATE economy SET Balance = Balance+' + euroreward + ' WHERE ID = ' + message.author.id + '';
								  connection.query(sql4);
									  console.log('User now has' + giveamount + '€');
							console.log('Awarded ' + euroreward + ' Euros!');
							}
							if (slots2 != '1' && slots3 == '1' && slots4 == '1' && slots5 == '1'){
								let euroreward = Math.floor(Math.random() * (20001)) + 0;
											let wonEmbed = new Discord.MessageEmbed()
									.setColor('#009933')
									.setAuthor(message.author.username)
									.setThumbnail(message.author.avatarURL({ dynamic:true }))
									.setDescription("Congrats, you won " + euroreward + "€!");
									
									message.channel.send(wonEmbed);
									let giveamount = result[0].balance + 25;
											let sql4 = 'UPDATE economy SET Balance = Balance+' + euroreward + ' WHERE ID = ' + message.author.id + '';
									  connection.query(sql4);
										  console.log('User now has' + giveamount + '€');
								console.log('Awarded ' + euroreward + ' Euros!');
								}
								if (slots2 != '2' && slots3 == '2' && slots4 == '2' && slots5 == '2'){
									let euroreward = Math.floor(Math.random() * (20001)) + 0;
												let wonEmbed = new Discord.MessageEmbed()
										.setColor('#009933')
										.setAuthor(message.author.username)
										.setThumbnail(message.author.avatarURL({ dynamic:true }))
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
  }
});

client.on("message", (message) => {
  if (message.content.startsWith(prefix + "work")) {
	  	  if(jailed.has(message.author.id)){
	let jailEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription("You have been jailed, please wait 5 minutes from the jailing to continue");
	message.channel.send(jailEmbed);
	  } else if (workdown.has(message.author.id)) {
		  	let coolEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription("Please wait 1 minute before using this command again");
	message.channel.send(coolEmbed);
	  } else {
	const work = ["You work at a grocery store and earn ", "You work at a petrol station and ear ", "You work for at an amusement park and earn ", "You work at a prison and earn ", "You work at a restaurant and earn ", "You work at a hospital and earn ", "You work as a bus driver and earn "];
randomWork = work[Math.floor(Math.random() * work.length)];
	var euroreward = Math.floor(Math.random() *(1001)) + 0;
				workdown.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          workdown.delete(message.author.id);
        }, 60000);
				let wonEmbed = new Discord.MessageEmbed()
	.setColor('#009933')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription(randomWork + euroreward + "€");
	
	message.channel.send(wonEmbed);
let c = connection.query("SELECT balance FROM economy WHERE ID = ?;", message.author.id, function (err, result, fields){
    if(result == 0) { 
      let register ="INSERT INTO economy (ID, Balance, Bank,username) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "');";
      connection.query(register)
	  				let nullEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
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
  }
});

client.on("message", (message) => {
  if (message.content.startsWith(prefix + "crime")) {
	  if(jailed.has(message.author.id)){
	let jailEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription("You have been jailed, please wait 5 minutes from the jailing to continue");
	message.channel.send(jailEmbed);
	  } else if(crimedown.has(message.author.id)){
	let jailEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription("Please wait 1 minute before using this command again");
	message.channel.send(jailEmbed);
	  } else {
var succesrate = Math.floor(Math.random() * (6-0)) + 0;
console.log(succesrate); //Shows which selection is picked
if (succesrate == '0'){
	const rand1 = ["You robbed an old lady and gained 25€", "You successfully stole 25€ from a petrol station", "You successfully pickpocketed 25€ from a stranger on the bus", "You successfully knocked out a random man on the street and took his wallet gaining 25€", "You successfully screwed a random person on the street for 25€", "You steal a cell phone and sell it for 25€", "You take 25€ from the register at your job", "You rob a bank but only managed to grab 25€", "You scammed 25€ from a stranger on the street.", "You manage to steal a few candy bars from the petrol station and resell them for 25€"];
randomNumber1 = rand1[Math.floor(Math.random() * rand1.length)];
					let wonEmbed = new Discord.MessageEmbed()
	.setColor('#009933')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription(randomNumber1);
	
	message.channel.send(wonEmbed);

let c = connection.query("SELECT balance FROM economy WHERE ID = ?;", message.author.id, function (err, result, fields){
    if(result == 0) { 
      let register ="INSERT INTO economy (ID, Balance, Bank,username) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "');";
      connection.query(register)
            	  				let nullEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription("You do not have an account, one has been opened for you. Unfortunately this means you will not receive the winnings for this round.");
	
	message.channel.send(nullEmbed);
    } else { 
	let giveamount = result[0].balance + 25
      let sql3 = 'UPDATE economy SET Balance = Balance+25 WHERE ID = ' + message.author.id + '';
      connection.query(sql3);
	  	console.log('User now has' + giveamount + '€');
							crimedown.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          crimedown.delete(message.author.id);
        }, 60000);
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
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription(randomNumber2);
	
	message.channel.send(wonEmbed);
	
	let c = connection.query("SELECT balance FROM economy WHERE ID = ?;", message.author.id, function (err, result, fields){
    if(result == 0) { 
      let register ="INSERT INTO economy (ID, Balance, Bank,username) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "');";
      connection.query(register)
            	  				let nullEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription("You do not have an account, one has been opened for you. Unfortunately this means you will not receive the winnings for this round.");
	
	message.channel.send(nullEmbed);
    } else { 
	let giveamount = result[0].balance + 5
      let sql3 = 'UPDATE economy SET Balance = Balance+5 WHERE ID = ' + message.author.id + '';
      connection.query(sql3);
	  	console.log('User now has' + giveamount + '€');
					crimedown.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          crimedown.delete(message.author.id);
        }, 60000);
    }
	console.log('Awarded 5 Euros!');
});
	
}
if (succesrate == '2'){
	const rand3 = ["You successfully robbed a bank gaining ", "You spend the night mugging random people and gain ", "You steal a few cell phones and manage to get ", "You created a scam project and managed to gain ", "You steal a bus and sell it for ", "You steal from the register and get ", "You beat an old lady down and take ", "When no one was looking you took from the register "];
	var euroreward = Math.floor(Math.random() * (5001-0)) + 0;
	randomNumber3 = rand3[Math.floor(Math.random() * rand3.length)];
						let wonEmbed = new Discord.MessageEmbed()
	.setColor('#009933')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription(randomNumber3 + euroreward + "€");
	
	message.channel.send(wonEmbed);
	let c = connection.query("SELECT balance FROM economy WHERE ID = ?;", message.author.id, function (err, result, fields){
    if(result == 0) { 
      let register ="INSERT INTO economy (ID, Balance, Bank,username) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "');";
      connection.query(register)
            	  				let nullEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription("You do not have an account, one has been opened for you. Unfortunately this means you will not receive the winnings for this round.");
	
	message.channel.send(nullEmbed);
    } else { 
	let giveamount = result[0].balance + euroreward
      let sql3 = 'UPDATE economy SET Balance = Balance+' + euroreward + ' WHERE ID = ' + message.author.id + '';
      connection.query(sql3);
	  	console.log('User now has ' + giveamount + '€');
					crimedown.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          crimedown.delete(message.author.id);
        }, 60000);
    }
	console.log('Awarded ' + euroreward + ' Euros!');
});
		
}
if (succesrate == '3'){
	const rand4 = ["You tried to steal from the register but got beaten down by an employee", "You tried to pickpocket a stranger on the street but got tased", "You try to rob an old lady but she fought back hard", "You try to create a scam project but it was taken down", "You steal a few cell phones but UH OH! they were tracked to you", "You try to rob a bank but got taken down by security", "You try to steal a few candy bars from the petrol station but forget they have security cameras!", "You try to knock a stranger on the street out but got knocked out tripping on the sidewalk"];
	randomNumber4 = rand4[Math.floor(Math.random() * rand4.length)];
							let lostEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription(randomNumber4);
	
	message.channel.send(lostEmbed);
				crimedown.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          crimedown.delete(message.author.id);
        }, 60000);
  }
if (succesrate == '4'){
	const rand5 = ["You tried to rob a bank but instead got sent to prison and fined ", "You try to steal a traffic cone and get fined ", "You break several traffic laws and get fined ", "You try mugging a stranger but he knocks you down and steals your money, you lost ", "You try to rob a house but are jumped by a naked man chasing while screeching, while running in horror you drop ", "You try to sell drugs to little kids when you are busted by the Polzei. You are sent to prison and fined ", "You try to pickpocket people on the bus when someone notices and beats you down. While sobbing and running as fast as you can off the bus you drop "];
	randomNumber5 = rand5[Math.floor(Math.random() * rand5.length)];
	var euroreward2 = Math.floor(Math.random() *(7001)) + 0;
								let lostEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription(randomNumber5 + euroreward2 + "€");
	
	message.channel.send(lostEmbed);
				crimedown.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          crimedown.delete(message.author.id);
        }, 60000);
	let c = connection.query("SELECT balance FROM economy WHERE ID = ?;", message.author.id, function (err, result, fields){
    if(result == 0) { 
      let register ="INSERT INTO economy (ID, Balance, Bank,username) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "');";
      connection.query(register)
           	  				let nullEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription("You do not have an account, one has been opened for you. Unfortunately this means you will not receive the winnings for this round.");
	
	message.channel.send(nullEmbed);
    } else { 
	let giveamount = result[0].balance + euroreward2 //This sets the value to send to console.log
      let sql3 = 'UPDATE economy SET Balance = Balance-' + euroreward2 + ' WHERE ID = ' + message.author.id + '';
      connection.query(sql3);
	  	console.log('User now has' + giveamount + '€'); //This shows the console what the user now has
					crimedown.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          crimedown.delete(message.author.id);
        }, 60000);
    }
	console.log('Awarded '+ euroreward2 + ' Euros!'); //This shows console what was rewarded
});
}
if (succesrate == '5'){
	const rand6 = ["You tried to rob a bank but get arrested!", "You beat up a homeless man but the Polizei was near and caught you!", "You try to sell fake phones to the elderly but get caught by an undercover Polizei JAILED!", "You try to rob a house but get subdued by a huge man, JAILED!"];
	randomnumber6 = rand6[Math.floor(Math.random() * rand6.length)];
        							let lostEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription(randomnumber6);
	
	message.channel.send(lostEmbed);
	jailed.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          jailed.delete(message.author.id);
        }, 300000);
			crimedown.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          crimedown.delete(message.author.id);
        }, 60000);
}
}
}
);

client.on("message", (message) => {
	    const args = message.content.slice(prefix.length).trim().split(' ');
const command = args.shift().toLowerCase();
  if (!message.content.startsWith(prefix) || message.author.bot) {
  } else if (command === 'dep') {
	if (!args.length) {
		return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
	}
let b = connection.query("SELECT balance, bank FROM economy WHERE ID = ?;", message.author.id, function (err, result, fields){
	console.log(result); //Shows what result the query is getting
if (Object.keys(result).length === 0) {
	      let register ="INSERT INTO economy (ID, Balance, Bank,username) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "');";
		  connection.query(register)
	  	  				let nullEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription("You do not have an account, one has been opened for you.");
	
	message.channel.send(nullEmbed);
} else if (toFixed(args[0]) <= toFixed(result[0].balance) && toFixed(args[0]) >= 0){
	let rembal = 'UPDATE economy SET Balance = Balance-' + args[0] + ' WHERE ID = ' + message.author.id + '';
		connection.query(rembal);
			let addbank = 'UPDATE economy SET Bank = Bank+' + args[0] + ' WHERE ID = ' + message.author.id + '';
		connection.query(addbank);
	let balEmbed = new Discord.MessageEmbed()
	.setColor('#000099')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription('Deposited ' + args[0] + ' euros into your bank!')
	
	message.channel.send(balEmbed);
} else { 
		  				let nullEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription("Insufficient Funds, You currently have: " + result[0].balance + "");
	
	message.channel.send(nullEmbed);
}
})
  }
});

client.on("message", (message) => {
	    const args = message.content.slice(prefix.length).trim().split(' ');
const command = args.shift().toLowerCase();
  if (!message.content.startsWith(prefix) || message.author.bot) {
  } else if (command === 'with') {
	if (!args.length) {
		return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
	}
let b = connection.query("SELECT balance, bank FROM economy WHERE ID = ?;", message.author.id, function (err, result, fields){
	console.log(result); //Shows what result the query is getting
if (Object.keys(result).length === 0) {
	      let register ="INSERT INTO economy (ID, Balance, Bank,username) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "');";
		  connection.query(register)
	  	  				let nullEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription("You do not have an account, one has been opened for you.");
	
	message.channel.send(nullEmbed);
} else if (toFixed(args[0]) <= toFixed(result[0].bank)){
	if (toFixed(args[0]) > 0){
	console.log(toFixed(args[0]));
	console.log(toFixed(result[0].bank));
	let rembal = 'UPDATE economy SET Balance = Balance+' + args[0] + ' WHERE ID = ' + message.author.id + '';
		connection.query(rembal);
			let addbank = 'UPDATE economy SET Bank = Bank-' + args[0] + ' WHERE ID = ' + message.author.id + '';
		connection.query(addbank);
	let balEmbed = new Discord.MessageEmbed()
	.setColor('#000099')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription('Withdrawn ' + args[0] + ' euros from your bank!')
	
	message.channel.send(balEmbed);
	}
} else { 
	console.log(toFixed(args[0]));
	console.log(toFixed(result[0].bank));
		  				let nullEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription("Insufficient Funds, You currently have: " + result[0].bank + "");
	
	message.channel.send(nullEmbed);
}
})
  }
});

client.on("message", (message) => {
	    const args = message.content.slice(prefix.length).trim().split(' ');
const command = args.shift().toLowerCase();
  if (!message.content.startsWith(prefix) || message.author.bot) {
  } else if (command === 'give') {
	if (!args.length) {
		return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
	}
	if (message.mentions.members.size != 0){
let b = connection.query("SELECT balance, bank FROM economy WHERE ID = ?;", message.author.id, function (err, result, fields){
	console.log(result); //Shows what result the query is getting
if (Object.keys(result).length === 0) {
	      let register ="INSERT INTO economy (ID, Balance, Bank,username) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "');";
		  connection.query(register)
	  	  				let nullEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription("You do not have an account, one has been opened for you.");
	
	message.channel.send(nullEmbed);
} else if (toFixed(args[1]) <= toFixed(result[0].balance)){
	if (toFixed(args[1]) > 0){
	console.log(toFixed(args[1]));
	console.log(toFixed(result[0].balance));
	let rembal = 'UPDATE economy SET Balance = Balance-' + args[1] + ' WHERE ID = ' + message.author.id + '';
		connection.query(rembal);
		let user = message.mentions.users.first();
			let addbank = 'UPDATE economy SET Balance = Balance+' + args[1] + ' WHERE ID = ' + user.id + '';
		connection.query(addbank);
	let balEmbed = new Discord.MessageEmbed()
	.setColor('#000099')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription('Gave ' + args[1] + ' euros to ' + user.username + '')
	
	message.channel.send(balEmbed);
	}
}
});
  }
  }
});

client.on("message", (message) => {
	const args = message.content.slice(prefix.length).trim().split(' ');
const command = args.shift().toLowerCase();
if (!message.content.startsWith(prefix) || message.author.bot) {
} else if (command === 'admingive') {
	if (message.member.hasPermission("ADMINISTRATOR")){
if (!args.length) {
	return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
}
if (message.mentions.members.size != 0){
let b = connection.query("SELECT balance, bank FROM economy WHERE ID = ?;", message.author.id, function (err, result, fields){
console.log(result); //Shows what result the query is getting
if (Object.keys(result).length === 0) {
	  let register ="INSERT INTO economy (ID, Balance, Bank,username) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "');";
	  connection.query(register)
						let nullEmbed = new Discord.MessageEmbed()
.setColor('#800000')
.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
.setDescription("You do not have an account, one has been opened for you.");

message.channel.send(nullEmbed);
} else if (toFixed(args[1]) > 0){
if (toFixed(args[1]) > 0){
console.log(toFixed(args[1]));
console.log(toFixed(result[0].balance));
	let user = message.mentions.users.first();
		let addbank = 'UPDATE economy SET Balance = Balance+' + args[1] + ' WHERE ID = ' + user.id + '';
	connection.query(addbank);
let balEmbed = new Discord.MessageEmbed()
	.setColor('#000099')
	.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription('Gave ' + args[1] + ' euros to ' + user.username + ' as admin!')

message.channel.send(balEmbed);
console.log(user)
console.log(toFixed(args[1]));
console.log(toFixed(result[0].balance));
} else {
	console.log("AdminGive Failed: Amount must not be below 0!")
}
} else {
	console.log("AdminGive Failed: Account Error!")
}
})
} else {
	console.log("AdminGive Failed: Member Error!");
}
} else {message.channel.send("You do not have permission to run this command!")
}
} else if (command === 'admintake') {
	if (message.member.hasPermission("ADMINISTRATOR")){
if (!args.length) {
	return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
}
if (message.mentions.members.size != 0){
let b = connection.query("SELECT balance, bank FROM economy WHERE ID = ?;", message.author.id, function (err, result, fields){
console.log(result); //Shows what result the query is getting
if (Object.keys(result).length === 0) {
	  let register ="INSERT INTO economy (ID, Balance, Bank,username) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "');";
	  connection.query(register)
						let nullEmbed = new Discord.MessageEmbed()
.setColor('#800000')
.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
.setDescription("That user does not have an account, one has been created for them.");

message.channel.send(nullEmbed);
} else if (toFixed(args[1]) <= toFixed(result[0].balance)){
if (toFixed(args[1]) > 0){
console.log(toFixed(args[1]));
console.log(toFixed(result[0].balance));
	let user = message.mentions.users.first();
		let addbank = 'UPDATE economy SET Balance = Balance-' + args[1] + ' WHERE ID = ' + user.id + '';
	connection.query(addbank);
let balEmbed = new Discord.MessageEmbed()
.setColor('#000099')
.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
.setDescription('Took ' + args[1] + ' euros from ' + user.username + '')

message.channel.send(balEmbed);
}
}
})
}
} else { message.channel.send("You do not have permission to run this command!")
}
}
});

client.on("message", (message) => {
	const args = message.content.slice(prefix.length).trim().split(' ');
const command = args.shift().toLowerCase();
if (!message.content.startsWith(prefix) || message.author.bot) {
if (command === 'give') {
if (!args.length) {
	return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
}
if (message.mentions.members.size != 0){
let b = connection.query("SELECT balance, bank FROM economy WHERE ID = ?;", message.author.id, function (err, result, fields){
console.log(result); //Shows what result the query is getting
if (Object.keys(result).length === 0) {
	  let register ="INSERT INTO economy (ID, Balance, Bank,username) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "');";
	  connection.query(register)
						let nullEmbed = new Discord.MessageEmbed()
.setColor('#800000')
.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
.setDescription("That user does not have an account, one has been created for them.");

message.channel.send(nullEmbed);
} else if (toFixed(args[1]) <= toFixed(result[0].balance)){
if (toFixed(args[1]) > 0){
console.log(toFixed(args[1]));
console.log(toFixed(result[0].balance));
let rembal = 'UPDATE economy SET Balance = Balance-' + args[1] + ' WHERE ID = ' + message.author.id + '';
	connection.query(rembal);
	let user = message.mentions.users.first();
		let addbank = 'UPDATE economy SET Balance = Balance+' + args[1] + ' WHERE ID = ' + user.id + '';
	connection.query(addbank);
let balEmbed = new Discord.MessageEmbed()
.setColor('#000099')
.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
.setDescription('Gave ' + args[1] + ' euros to ' + user.username + '')

message.channel.send(balEmbed);
}
}
})
}
}
}
});

client.on("message", (message) => {
	if (message.content.startsWith("!leaderboard")) {
  let b = connection.query("SELECT * FROM economy ORDER BY Bank DESC;", function (err, result, fields){
	if (Object.keys(result).length === 0) {
		message.channel.send("Error! There are no current accounts!");
	} else {
		let userString = "";
		Object.keys(result).forEach(function (key) {
			let row = result[key];
			let users = row.username + ': ' + row.Bank;
			let usersarr = users.split("\n");
			userString += `\n${usersarr}`;
		});

		let balEmbed = new Discord.MessageEmbed()
		.setColor('#000099')
		.setTitle('Leaderboard')
		.setDescription(userString)
		
		message.channel.send(balEmbed);

	}
	  console.log(result); //Shows what result the query is getting
  })
	}
  });

  client.on("message", (message) => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	
	const args = message.content.slice(prefix.length).trim().split(' ');
	const command = args.shift().toLowerCase();
	
	if (command === 'bj') {
			  if(jailed.has(message.author.id)){
	  let jailEmbed = new Discord.MessageEmbed()
	  .setColor('#800000')
	  .setAuthor(message.author.username)
	  .setThumbnail(message.author.avatarURL({ dynamic:true }))
	  .setDescription("You have been jailed, please wait 5 minutes from the jailing to continue");
	  message.channel.send(jailEmbed);
		} else if (bjdown.has(message.author.id)) {
				let coolEmbed = new Discord.MessageEmbed()
	  .setColor('#800000')
	  .setAuthor(message.author.username)
	  .setThumbnail(message.author.avatarURL({ dynamic:true }))
	  .setDescription("Please wait 1 minute before using this command again");
	  message.channel.send(coolEmbed);
		} else {
  let c = connection.query("SELECT balance FROM economy WHERE ID = ?;", message.author.id, function (err, result, fields){
	  if(result == 0) { 
		let register ="INSERT INTO economy (ID, Balance, Bank,username) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "');";
		connection.query(register)
							  let nullEmbed = new Discord.MessageEmbed()
	  .setColor('#800000')
	  .setAuthor(message.author.username)
	  .setThumbnail(message.author.avatarURL({ dynamic:true }))
	  .setDescription("You do not have an account, one has been opened for you. Unfortunately this means you will not receive the winnings for this round.");
	  
	  message.channel.send(nullEmbed);
	  } else if (result[0].balance < args[0] && result[0].balance < 0){
									let jailEmbed = new Discord.MessageEmbed()
	  .setColor('#800000')
	  .setAuthor(message.author.username)
	  .setThumbnail(message.author.avatarURL({ dynamic:true }))
	  .setDescription("Insufficient Funds, You currently have: " + result[0].balance + "");
	  
	  message.channel.send(jailEmbed);
	  } else if (bjactive == false && args[0] > 0 && result[0].balance >= args[0]) {
		bj.add(message.author.id);
		bjactive = true
		console.log("BlackJack Active!")

		let success = 'UPDATE economy SET Balance = Balance-' + args[0] + ' WHERE ID = ' + message.author.id + '';
connection.query(success)
let number = Math.floor(Math.random() * (21-0)) + 0;
let dealer = Math.floor(Math.random() * (21-0)) + 0;
let balEmbed = new Discord.MessageEmbed()
.setColor('#000099')
.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
.setDescription('Your number: ' + (number + 1) + '');

message.channel.send(balEmbed);
globalvalue = (number + 1)
console.log(globalvalue);
dealervalue = (dealer + 1)
moneyvalue = args[0];
bjdown.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          bjdown.delete(message.author.id);
        }, 60000);

  }
  });
  }
	}
  });

  client.on("message", (message) => {
	if (message.content.startsWith("hit")) {
  let b = connection.query("SELECT balance, bank FROM economy WHERE ID = ?;", message.author.id, function (err, result, fields){
	  console.log(result); //Shows what result the query is getting
  if (Object.keys(result).length === 0) {
			let register ="INSERT INTO economy (ID, Balance, Bank,username) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "');";
			connection.query(register)
							  let nullEmbed = new Discord.MessageEmbed()
	  .setColor('#800000')
	  .setAuthor(message.author.username)
	  .setThumbnail(message.author.avatarURL({ dynamic:true }))
	  .setDescription("You do not have an account, one has been opened for you.");
	  
	  message.channel.send(nullEmbed);
  } else if(bjactive == true && bj.has(message.author.id)) {
	let number = Math.floor(Math.random() * (11-0)) + 0;
	globalvalue = globalvalue + (number + 1)
	let balEmbed = new Discord.MessageEmbed()
.setColor('#000099')
.setAuthor(message.author.username)
	.setThumbnail(message.author.avatarURL({ dynamic:true }))
.setDescription('New total: ' + globalvalue + '');
message.channel.send(balEmbed);
if (globalvalue > 21){
	bjactive = false;
	bj.delete(message.author.id);
	let balEmbed = new Discord.MessageEmbed()
	.setColor('#800000')
	.setAuthor(message.author.username)
		.setThumbnail(message.author.avatarURL({ dynamic:true }))
	.setDescription('Busted!');
	message.channel.send(balEmbed);
	globalvalue = 0;
	dealervalue = 0;
	moneyvalue = 0;

}

  }
  })
	}
  });

  client.on("message", (message) => {
	if (message.content.startsWith("stand")) {
  let b = connection.query("SELECT balance, bank FROM economy WHERE ID = ?;", message.author.id, function (err, result, fields){
	  console.log(result); //Shows what result the query is getting
  if (Object.keys(result).length === 0) {
			let register ="INSERT INTO economy (ID, Balance, Bank,username) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "');";
			connection.query(register)
							  let nullEmbed = new Discord.MessageEmbed()
	  .setColor('#800000')
	  .setAuthor(message.author.username)
	  .setThumbnail(message.author.avatarURL({ dynamic:true }))
	  .setDescription("You do not have an account, one has been opened for you.");
	  
	  message.channel.send(nullEmbed);
  } else if(bjactive == true && bj.has(message.author.id)) {
while (bjactive == true){
	let dealer = Math.floor(Math.random() * (11-0)) + 0;
	dealervalue = dealervalue + (dealer + 1);
	if (dealervalue > 21){
		console.log(dealervalue)
		let balEmbed = new Discord.MessageEmbed()
		.setColor('#000099')
		.setAuthor(message.author.username)
			.setThumbnail(message.author.avatarURL({ dynamic:true }))
		.setDescription('Dealer: ' + globalvalue + '');
		message.channel.send(balEmbed);
		let wonEmbed = new Discord.MessageEmbed()
		.setColor('#009933')
		.setAuthor(message.author.username)
		.setThumbnail(message.author.avatarURL({ dynamic:true }))
		.setDescription('Dealer Busts at ' + dealervalue + '! You won ' + (moneyvalue * 2) + '!');
		
		message.channel.send(wonEmbed);
		let addbank = 'UPDATE economy SET Balance = Balance+' + (moneyvalue * 2) + ' WHERE ID = ' + message.author.id + '';
		connection.query(addbank);
		bjactive = false;
		bj.delete(message.author.id);
		globalvalue = 0;
		dealervalue = 0;
		moneyvalue = 0;
	} else if(dealervalue > globalvalue){
		console.log("dealer won!");
		let wonEmbed = new Discord.MessageEmbed()
		.setColor('#800000')
		.setAuthor(message.author.username)
		.setThumbnail(message.author.avatarURL({ dynamic:true }))
		.setDescription('Dealer at: ' + dealervalue + ', User Loses!');
		
		message.channel.send(wonEmbed);
		bjactive = false;
		bj.delete(message.author.id);
		globalvalue = 0;
		dealervalue = 0;
		moneyvalue = 0;
	} else if (dealervalue > globalvalue && dealervalue != 21){
		console.log("Dealer Won");
		let wonEmbed = new Discord.MessageEmbed()
		.setColor('#800000')
		.setAuthor(message.author.username)
		.setThumbnail(message.author.avatarURL({ dynamic:true }))
		.setDescription('Dealer at: ' + dealervalue + ', User Loses!');
		
		message.channel.send(wonEmbed);
		bjactive = false;
		bj.delete(message.author.id);
		globalvalue = 0;
		dealervalue = 0;
		moneyvalue = 0;
	} else {
		console.log(moneyvalue)
		console.log(dealervalue)
		console.log(globalvalue)
	}
}
  }
  })
	}
  });



client.login(settings.token);