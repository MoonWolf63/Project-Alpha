# Project Alpha
Project Alpha is a discord economy bot(Latest Discord.js Recommended). As of version 0.2 this bot offers a simple functional economy with the ability to work for money and the ability to do crime(NOT ACTUAL) for money. It also provides a slot machine with a nice payout(MAY SOON TO CHANGE PAYOUT RATE WITH UPCOMING UPDATES). The crime command provides great risk with a payout of 5K and a negative payout of 8K, will you take the risk?(MAY CHANGE). There is also a decent horse racing bet system, to use it first type !horses and that will show a list of the available horses and their odds(payout). Next you just use !bethorse [1-6] [betamount] so for example !bethorse 3 2500. This means you are betting 2500 euros on horse 3. As of 1.0 I have added some commands which indicate a shop system, however these are just placeholders and are not fully functional in the version. They are meant to be finished in later versions and I just didn't feel like removing them.

## Installation

To install this you must have NODEJS installed for it to properly work (SUGGESTED NODEJS VERSION: 12.18.2). You must also have a MYSQL server for user data, I suggest using xampp or ubuntu mysql.
First, you must open config.json and enter in your bot token.
Second, you must set up the database, if you are using xampp or at least phpmyadmin create the database. You can name the database what ever you want. After creating the database import the sql file in the sql folder. If you are using command line log in through mysql -u root(INSERT YOUR USERNAME IF ITS NOT ROOT). After that enter your password and type CREATE DATABASE DBNAME(Name it what ever you like); You must end it with a ; or it wont work. After doing that type exit; and type mysql -u root -p DBNAME(The name of the database that was created) < projectalpha.sql;.
Third, you must open index.js and add your MYSQL data to the list (I plan on later making the MYSQL data into a .json file)

## Usage

To start the bot, change directory to the bot directory and type node index.js
To see your balance type the command fb!bal
To try an gain some money type fb!crime (Careful! You can also lose money!)
To go for a great chance type for fb!roulette

TO KEEP IT CONSTANTLY RUNNING DO npm install forever THEN TYPE forever index.js

## Updates (V.0.1) 3.12.20

Bot Created

Command Added: fb!bal

Command Added fb!crime

## Updates (V.0.2) 4.12.20

Added fb!work which allows you to earn between 1 and 1000 euros

Added fb!slots which is a slot machine with a payout between 1 and 50000 euros.

## Updates (V.0.3) 1.1.21

Bug fixes

## Updates (V.0.4) 25.1.21

Created a roulette command fb!roulette 

## Updates (V.0.5) 28.3.21

Added embeds on each command for style

## Updates (V.0.6) 1.4.21

Added a bank system

Added !with

Added !dep

Added embeds to all the commands for style.

## Updates (V.0.7) 10.4.21

Added !admingive [@MENTION] [AMOUNT] and !admintake [@MENTION] [AMOUNT]

Added !give [@MENTION] [AMOUNT]

Added !leaderboard

## Updates (V.0.8) 26.4.21

Added !bj (blackjack)

Added hit

Added stand

To play bj type !bj [betamount] then either type hit or stand without prefix.

Fixed some bugs

Fixed admingive

## Updates (V.0.9) 30.4.21

Bug Fixes

Fixed give command

Added variable prefix to all commands instead of just some commands

## Updates (V.1.0)22.9.21

Added a horse race system

Added !horses

Added !bethorse [horsenumber] [betamount]

Added placeholders for a soon to come shop system

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)

## Info

You may not claim this bot as your own. This is for everyone but you must give credit to the creator.

This is still in development and may not be stable
