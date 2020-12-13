# Project Alpha
Project Alpha is a discord economy bot(Latest Discord.js Recommended). As of version 0.2 this bot offers a simple functional economy with the ability to work for money and the ability to do crime(NOT ACTUAL) for money. It also provides a slot machine with a nice payout(MAY SOON TO CHANGE PAYOUT RATE WITH UPCOMING UPDATES). The crime command provides great risk with a payout of 50K and a negative payout of 100K, will you take the risk?(MAY CHANGE).

## Installation

To install this you must have NODEJS installed for it to properly work (SUGGESTED NODEJS VERSION: 12.18.2). You must also have a MYSQL server for user data, I suggest using xampp or ubuntu mysql.
First, you must open config.json and enter in your bot token.
Second, you must set up the database, if you are using xampp or at least phpmyadmin create the database. You can name the database what ever you want. After creating the database import the sql file in the sql folder. If you are using command line log in through mysql -u root(INSERT YOUR USERNAME IF ITS NOT ROOT). After that enter your password and type CREATE DATABASE DBNAME(Name it what ever you like); You must end it with a ; or it wont work. After doing that type exit; and type mysql -u root -p DBNAME(The name of the database that was created) < projectalpha.sql;.
Third, you must open index.js and add your MYSQL data to the list (I plan on later making the MYSQL data into a .json file)

## Usage

To start the bot, change directory to the bot directory and type node index.js
To see your balance type the command fb!bal
To try an gain some money type fb!crime (Careful! Theres a high risk of losing a lot!)

## Updates (V.0.1) 3.12.20

Bot Created

Command Added: fb!bal

Command Added fb!crime

## Updates (V.0.2) 4.12.20

Added fb!work which allows you to earn between 1 and 1000 euros

Added fb!slots which is a slot machine with a payout between 1 and 50000 euros.



## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)

## Info

You may not claim this bot as your own. This is for everyone but you must give credit to the creator.

This is still in development and may not be stable
