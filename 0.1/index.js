const Discord = require("discord.js");
require('events').EventEmitter.defaultMaxListeners = 300;
const client = new Discord.Client();
const mysql = require('mysql');
const settings = require('./config.json');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'projectalpha'
});
//Make sure you put your MYSQL data in or it the bot wont work

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
	  message.reply("You do not have an account, one has been opened for you");
} else {
message.channel.send(result[0].balance + '€');
}
})
  }

  });

client.on("message", (message) => {
  if (message.content.startsWith("fb!crime")) {
var succesrate = Math.floor(Math.random() * (6-0)) + 0;
console.log(succesrate); //Shows which selection is picked
if (succesrate == '0'){
	const rand1 = ["You robbed an old lady and gained 25€", "You successfully stole 25€ from a petrol station", "You successfully pickpocketed 25€ from a stranger on the bus", "You successfully knocked out a random man on the street and took his wallet gaining 25€", "You successfully screwed a random person on the street for 25€", "You steal a cell phone and sell it for 25€", "You take 25€ from the register at your job", "You rob a bank but only managed to grab 25€", "You scammed 25€ from a stranger on the street.", "You manage to steal a few candy bars from the petrol station and resell them for 25€"];
randomNumber1 = rand1[Math.floor(Math.random() * rand1.length)];
message.channel.send(randomNumber1);

let c = connection.query("SELECT balance FROM economy WHERE ID = ?;", message.author.id, function (err, result, fields){
    if(result == 0) { 
      let register ="INSERT INTO economy (ID, Balance) VALUES ('" + message.author.id + "', '0');";
      connection.query(register)
      message.reply("You do not have an account, one has been opened for you. Unfortunately this means you will not receive the winnings for this round."); // I plan to fix this in later versions
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
	message.channel.send(randomNumber2);
	
	let c = connection.query("SELECT balance FROM economy WHERE ID = ?;", message.author.id, function (err, result, fields){
    if(result == 0) { 
      let register ="INSERT INTO economy (ID, Balance) VALUES ('" + message.author.id + "', '0');";
      connection.query(register)
      message.reply("You do not have an account, one has been opened for you. Unfortunately this means you will not receive the winnings for this round."); // I plan to fix this in later versions
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
	var euroreward = Math.floor(Math.random() * (10001-0)) + 0;
	randomNumber3 = rand3[Math.floor(Math.random() * rand3.length)];
	message.channel.send(randomNumber3 + euroreward + "€");
	let c = connection.query("SELECT balance FROM economy WHERE ID = ?;", message.author.id, function (err, result, fields){
    if(result == 0) { 
      let register ="INSERT INTO economy (ID, Balance) VALUES ('" + message.author.id + "', '0');";
      connection.query(register)
      message.reply("You do not have an account, one has been opened for you. Unfortunately this means you will not receive the winnings for this round."); // I plan to fix this in later versions
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
	message.channel.send(randomNumber4);
  }
if (succesrate == '4'){
	const rand5 = ["You tried to rob a bank but instead got sent to prison and fined ", "You try to steal a traffic cone and get fined ", "You break several traffic laws and get fined ", "You try mugging a stranger but he knocks you down and steals your money, you lost ", "You try to rob a house but are jumped by a naked man chasing while screeching, while running in horror you drop ", "You try to sell drugs to little kids when you are busted by the Polzei. You are sent to prison and fined ", "You try to pickpocket people on the bus when someone notices and beats you down. While sobbing and running as fast as you can off the bus you drop "];
	randomNumber5 = rand5[Math.floor(Math.random() * rand5.length)];
	var euroreward2 = Math.floor(Math.random() *(50001)) + 0;
	message.channel.send(randomNumber5 + euroreward2 + "€");
	let c = connection.query("SELECT balance FROM economy WHERE ID = ?;", message.author.id, function (err, result, fields){
    if(result == 0) { 
      let register ="INSERT INTO economy (ID, Balance) VALUES ('" + message.author.id + "', '0');";
      connection.query(register)
      message.reply("You do not have an account, one has been opened for you. Unfortunately this means you will not receive the winnings for this round."); // I plan to fix this in later versions
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
        message.channel.send(randomnumber6);
}
}
);

client.login(settings.token);










