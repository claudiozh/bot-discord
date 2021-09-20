import {
  Client, Intents, Message, TextChannel,
} from 'discord.js';

interface SendMessageTextByChannelParams {
  channelId: string;
  message: string;
}

export default class AppDiscord {
  private client: Client;

  private isLoggedIn: boolean = false;

  constructor() {
    this.client = new Client({
      intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    });
  }

  async login(tokenBot: string): Promise<void> {
    try {
      await this.client.login(tokenBot);
      this.isLoggedIn = true;
    } catch (error) {
      this.isLoggedIn = false;
      console.log('Erro ao efetuar login.');
    }
  }

  async sendMessageTextByChannel(params: SendMessageTextByChannelParams): Promise<Message | null> {
    if (this.isLoggedIn) {
      const { channelId, message } = params;
      const channel = <TextChannel> this.client.channels.cache.get(channelId);

      if (channel) {
        return channel.send(message);
      }
    }

    return null;
  }
}
