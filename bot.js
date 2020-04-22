var Discord = require('discord.js');
var logger = require('winston');
var auth = require('./auth.json');
var fs = require('fs');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
let token = process.env.token;
console.log(token);
logger.level = 'debug';
// Initialize Discord Bot
const bot = new Discord.Client();

bot.on('ready', () => {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
    bot.user.setActivity(`!dab to dab`);
});

var files = fs.readdirSync(__dirname + '/dabimages')
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        if(cmd.substring(0,3) == 'dab' | cmd.substring(0,3) == 'Dab'){
            let num = parseInt(args)/files.length
            console.log(typeof num === 'number')
            if(typeof num === 'number' && !isNaN(num)){
                let chosenFile = files[Math.floor(num * files.length)] 
                bot.uploadFile({
                    to: channelID,
                    file: 'dabimages/' + chosenFile
                });
            }
            else{
                let chosenFile = files[Math.floor(Math.random() * files.length)] 
                bot.uploadFile({
                    to: channelID,
                    file: 'dabimages/' + chosenFile
                });
            }
        }
        else if(cmd.substring(0,4) == 'help'){
            bot.sendMessage({
                to: channelID,
                message: 'To use this bot, send !dab for randomized dab picture or !dab (some number from 0 to 368) for a specific image'
            });
        }
        else{
            bot.sendMessage({
                to: channelID,
                message: 'I don\'t understand that command'
            });
        }
     }
});

bot.login(process.env.token);