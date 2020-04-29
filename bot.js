var Discord = require('discord.js');
var logger = require('winston');
var fs = require('fs');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});

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

function checkFile(file, message) {
    if (typeof file !== "undefined") {
        message.channel.send("", {
            files: [
                'dabimages/' + chosenFile
            ]
        });
    }
    else{
        setTimeout(checkFile, 1000);
    }
}
 
bot.on('message', async message => {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if(message.author.bot) return;

    if(message.content.indexOf('!') !== 0) return;

    const args = message.content.slice(1).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    
    if(command === 'dab'){
        argument = args[0]
        let num = parseInt(argument)/files.length
        if(typeof num === 'number' && !isNaN(num)){
            let chosenFile = files[Math.floor(num * files.length)] 
            message.channel.send("", {
                files: [
                    'dabimages/' + chosenFile
                ]
            });
        }
        else if(argument){
            console.log(argument)
            num = 0;
            for (var i = 0; i < argument.length; i++) {
               num = num + argument.charCodeAt(i)
            }
            num = num % 368;
            console.log(num)
            let chosenFile = files[Math.floor(num * files.length)];
            checkFile(chosenFile, message);
        }
        else{
            let chosenFile = files[Math.floor(Math.random() * files.length)] 
            message.channel.send("", {
                files: [
                    'dabimages/' + chosenFile
                ]
            });
        }
    }
    else if(command === 'help'){
        message.channel.send('To use this bot, send !dab for randomized dab picture or !dab (some number from 0 to 368) for a specific image');
    }
    else{
        message.channel.send('I don\'t understand that command');
    }
});

bot.login(process.env.token);