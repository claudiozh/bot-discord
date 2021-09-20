import {
  Client, Intents, Message, TextChannel,
} from 'discord.js';

interface StartParams {
    tokenBot: string;
    channelId: string;
  }

export default class BotDiscord {
    private static client: Client;

    private static channel: TextChannel;

    private static channelId: string;

    static start(params: StartParams) {
      const { tokenBot, channelId } = params;

      this.newClient();
      this.onReady(() => this.setInfoChannel(channelId));
      this.login(tokenBot);
    }

    private static newClient(): Client {
      this.client = new Client({
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
      });

      return this.client;
    }

    private static onReady(fncallback: () => void) {
      this.client.on('ready', () => {
        this.listenEvents();
        fncallback();
      });
    }

    private static login(token: string) {
      this.client.login(token);
    }

    private static listenEvents() {
      this.onMessageCreate();
      this.onMessageDelete();
      this.onMessageUpdate();
    }

    private static setInfoChannel(channelId: string) {
      this.channelId = channelId;
      this.channel = <TextChannel> this.client.channels.cache.get(this.channelId);
    }

    private static onMessageCreate() {
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

    private static onMessageUpdate() {
      this.client.on('messageUpdate', (oldMessage: Message, newMessage: Message) => {
        console.log('Old message updated', oldMessage.content);
        console.log('New message updated', newMessage.content);
      });
    }

    private static onMessageDelete() {
      this.client.on('messageDelete', (message: Message) => {
        console.log('Message deleted', message.content);
      });
    }

    private static async sendMessageText(message: string) {
      await this.channel.sendTyping();
      this.channel.send(message);
    }
}
