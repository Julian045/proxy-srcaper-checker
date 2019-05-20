process.on('uncaughtException', err => {});

const WebSocket = require('ws');
const socks = require('socks-proxy-agent');
const hagent = require('proxy-agent');
const {
    appendFileSync
} = require('fs');

var url = 'ws://echo.websocket.org';

class checker {
    constructor(type, proxy) {
        this.type = type;
        this.proxy = proxy;
        switch(this.type) {
            case 'socks':
                this.agent = new socks(`socks://${this.proxy}`);
                break;
            case 'http':
                this.agent = new hagent(`http://${this.proxy}`);
                break;
        }
        this.check();
    }
    check() {
        this.ws = new WebSocket(url, {
            agent: this.agent
        });
        this.ws.onopen = () => {
            if(this.ws.readyState === WebSocket.OPEN) {
                console.log(`${this.proxy} - working!`);
                appendFileSync(`${this.type}Checked.txt`, `${this.proxy}\n`);
                this.ws.close();
            }
        };
        this.ws.onerror = () => {
            console.log(`${this.proxy} - dead.`);
            this.ws.close();
        };
    }
}

module.exports = checker;
