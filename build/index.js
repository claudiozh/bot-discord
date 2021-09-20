"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
class BotDiscord {
    static start() {
        this.client = new discord_js_1.Client({
            intents: [discord_js_1.Intents.FLAGS.GUILDS, discord_js_1.Intents.FLAGS.GUILD_MESSAGES],
        });
        this.onReady();
        this.login();
    }
    static onReady() {
        this.client.on('ready', () => {
            this.channelId = process.env.CHANNEL_ID;
            this.channel = this.client.channels.cache.get(this.channelId);
            this.listenEvents();
        });
    }
    static login() {
        this.client.login(process.env.TOKEN_BOT);
    }
    static listenEvents() {
        this.onMessageCreate();
        this.onMessageDelete();
        this.onMessageUpdate();
    }
    static onMessageCreate() {
        this.client.on('messageCreate', (message) => {
            console.log('Message created', message.content);
            switch (message.content) {
                case 'ping':
                    this.sendMessageText('Pong');
                    break;
                default:
            }
        });
    }
    static onMessageUpdate() {
        this.client.on('messageUpdate', (oldMessage, newMessage) => {
            console.log('Old message updated', oldMessage.content);
            console.log('New message updated', newMessage.content);
        });
    }
    static onMessageDelete() {
        this.client.on('messageDelete', (message) => {
            console.log('Message deleted', message.content);
        });
    }
    static async sendMessageText(message) {
        await this.channel.sendTyping();
        this.channel.send(message);
    }
}
exports.default = BotDiscord;
BotDiscord.start();
//# sourceMappingURL=index.js.map