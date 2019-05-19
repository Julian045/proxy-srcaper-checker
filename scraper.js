const request = require('request');
const {
    writeFileSync
} = require('fs');

function scraper(type) {
    let url = null;
    switch(type) {
        case 'http':
            url = 'http://www.freshnewproxies24.top';
            outputFile = 'httpScraped.txt';
            break;
        case 'sock':
            url = 'http://www.socks24.org';
            outputFile = 'sockScraped.txt';
            break;
    }
    request(`${url}/search?max-results=1`, (err, req, body) => {
        if(err || req.statusCode !== 200) return;
        let proxyUrl = body.match(/<meta content='(.+?)' itemprop='url'\/>/gi)[1].match(/'(.+?)'/)[1];
        request(proxyUrl, (err, req, body) => {
            if(err || req.statusCode !== 200) return;
            let proxies = body.toString().match(/\d{1,3}([.])\d{1,3}([.])\d{1,3}([.])\d{1,3}((:)|(\s)+)\d{1,8}/g);
            writeFileSync(outputFile, proxies);
            console.log(`Proxies was successfuly scraped and added in ${outputFile}`);
        });
    });
}

module.exports = scraper;