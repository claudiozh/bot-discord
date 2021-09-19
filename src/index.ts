import {
  Client,
  Intents,
  Message,
  TextChannel,
} from 'discord.js';

import { config } from 'dotenv';

config();

export default class BotDiscord {
  private static client: Client;

  private static channel: TextChannel;

  private static channelId: string;

  static start() {
    this.client = new Client({
      intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    });

    this.onReady();
    this.login();
  }

  static onReady() {
    this.client.on('ready', () => {
      this.channelId = process.env.CHANNEL_ID;
      this.channel = <TextChannel> this.client.channels.cache.get(this.channelId);
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
    this.client.on('messageCreate', (message: Message) => {
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
    this.client.on('messageUpdate', (oldMessage: Message, newMessage: Message) => {
      console.log('Old message updated', oldMessage.content);
      console.log('New message updated', newMessage.content);
    });
  }

  static onMessageDelete() {
    this.client.on('messageDelete', (message: Message) => {
      console.log('Message deleted', message.content);
    });
  }

  static async sendMessageText(message: string) {
    await this.channel.sendTyping();
    this.channel.send(message);
  }
}

BotDiscord.start();
