const commander = require('commander');
const scraper = require('./scraper');
const checker = require('./checker');
const {
    existsSync,
    unlinkSync,
    readFileSync
} = require('fs');

commander.unknownOption = function() {
    console.log('Uknown option! PLease try -H to show the option list.');
    return;
}

commander
    .version('1.0.4')
    .option('-h, --http', 'Scrapes HTTP(s) proxies')
    .option('-s, --sock', 'Scrapes SOCKS5 proxies')
    .option('-r, --remove', 'Remove the proxy file')
    .option('-c, --checker', 'Check the proxies')
    .option('-a, --showAuthor', 'Shows who created this project')
    .option('-H, --showHelp', 'Shows help')
    .parse(process.argv)

if(!process.argv[2]) {
    console.log('Please add a option. Read ReadMe.txt for more information!');
    process.exit(1);
}

if(commander.http) {
    if(readFileSync('httpScraped.txt', 'utf8')) writeFileSync('httpScraped.txt', '');
    scraper('http');
}
if(commander.sock) {
    if(readFileSync('sockScraped.txt', 'utf8')) writeFileSync('sockScraped.txt', '');
    scraper('sock');
}

if(commander.checker) {
    if(existsSync('httpScraped.txt')) {
        if(readFileSync('httpChecked.txt', 'utf8')) writeFileSync('httpChecked.txt', '');
        let proxies = readFileSync('httpScraped.txt', 'utf8').split('\n');
        for(var proxy of proxies) new checker('http', proxy);
    }
    if(existsSync('sockScraped.txt')) {
        if(readFileSync('socksChecked.txt', 'utf8')) writeFileSync('socksChecked.txt', '');
        let proxies = readFileSync('sockScraped.txt', 'utf8').split('\n');
        for(var proxy of proxies) new checker('socks', proxy);
    }
}

if (commander.showHelp) commander.help();
if (commander.showAuthor) console.log('Author: Julian | Discord: Julian ✞☿#7288');

if(commander.remove) try {
    if(existsSync('httpScraped.txt')) {
        unlinkSync('httpScraped.txt');
        console.info('httpScraped.txt was successfully removed!');
    }
    if(existsSync('sockScraped.txt')) {
        unlinkSync('sockScraped.txt');
        console.info('sockScraped.txt was successfully removed!');
    }
    if(existsSync('httpChecked.txt')) {
        unlinkSync('httpChecked.txt');
        console.info('httpChecked.txt was successfully removed!');
    }
    if(existsSync('socksChecked.txt')) {
        unlinkSync('socksChecked.txt');
        console.info('socksChecked.txt was successfully removed!');
    }
} catch(e) {
    console.error(e);
}
