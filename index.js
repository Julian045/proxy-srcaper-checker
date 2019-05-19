const commander = require('commander');
const scraper = require('./scraper');
const {
    existsSync,
    unlinkSync
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
    .option('-a, --showAuthor', 'Shows who created this project')
    .option('-H, --showHelp', 'Shows help')
    .parse(process.argv)

if (!process.argv[2]) {
    console.log('Please add a option. Try -H to show the option list!');
    process.exit(1);
}

if (commander.http) scraper('http');
if (commander.sock) scraper('sock');

if (commander.showHelp) commander.help();
if (commander.showAuthor) console.log('Author: Julian | Discord: Julian ✞☿#7288');

if (commander.remove) try {
    if (existsSync('httpScraped.txt')) {
        unlinkSync('httpScraped.txt');
        console.info('httpScraped.txt was successfully removed!');
    }
    if (existsSync('sockScraped.txt')) {
        unlinkSync('sockScraped.txt');
        console.info('sockScraped.txt was successfully removed!');
    }
} catch (e) {
    console.error(e);
}
