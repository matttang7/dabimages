var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var fs = require('fs');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
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
            console.log(args)
            console.log(parseInt(args))
            let num = parseInt(args)/files.length
            console.log(num)
            console.log(typeof num === 'number')
            if(typeof num === 'number' && !isNaN(num)){
                console.log("reached")
                let chosenFile = files[Math.floor(num * files.length)] 
                console.log(chosenFile)
                bot.uploadFile({
                    to: channelID,
                    file: 'dabimages/' + chosenFile
                });
            }
            else{
                let chosenFile = files[Math.floor(Math.random() * files.length)] 
                console.log(chosenFile)
                bot.uploadFile({
                    to: channelID,
                    file: 'dabimages/' + chosenFile
                });
            }
        // Just add any case commands if you want to..
        }
        else{
            bot.sendMessage({
                to: channelID,
                message: 'I don\'t understand that command'
            });
        }
     }
});