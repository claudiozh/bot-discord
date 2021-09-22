import {
  Client, Intents, Message, TextChannel,
} from 'discord.js';

interface SendMessageBase {
  message: string;
  pathsFiles?: string[];
}

interface SendMessageByChannel extends SendMessageBase {
  channelId: string;
}

interface ReplyMessageByChannel extends SendMessageBase {
  quoteMessage: Message;
}

interface PrintErrorParams {
  message: string;
  originalMessage: string;
  stack: string;
}

// eslint-disable-next-line no-unused-vars
type OnMessageCreateType = (message: Message) => void;

// eslint-disable-next-line no-unused-vars
type OnMessageUpdateType = (oldMessage: Message, newMessage: Message) => void;

// eslint-disable-next-line no-unused-vars
type OnMessageDeleteType = (message: Message) => void;

export default class AppDiscord {
  private client: Client;

  constructor() {
    this.client = new Client({
      intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    });
  }

  async login(tokenBot: string): Promise<boolean> {
    try {
      await this.client.login(tokenBot);
      return true;
    } catch (error) {
      this.printError({
        message: 'Falha ao realizar login',
        originalMessage: error.message,
        stack: error.stack,
      });

      return false;
    }
  }

  onReady(fnCallback: () => void): void {
    this.client.on('ready', () => {
      fnCallback();
    });
  }

  onMessageCreate(fnCallback: OnMessageCreateType): void {
    this.client.on('messageCreate', (message: Message) => {
      fnCallback(message);
    });
  }

  onMessageUpdate(fnCallback: OnMessageUpdateType): void {
    this.client.on('messageUpdate', (oldMessage: Message, newMessage: Message) => {
      fnCallback(oldMessage, newMessage);
    });
  }

  onMessageDelete(fnCallback: OnMessageDeleteType): void {
    this.client.on('messageDelete', (message: Message) => {
      fnCallback(message);
    });
  }

  async sendMessageByChannel(params: SendMessageByChannel): Promise<Message | null> {
    try {
      const { channelId, message, pathsFiles } = params;
      const channel = this.getChannelById(channelId);
      await channel.sendTyping();

      return await channel.send({
        content: message,
        files: pathsFiles,
      });
    } catch (error) {
      this.printError({
        message: 'Falha ao enviar mensagem',
        originalMessage: error.message,
        stack: error.stack,
      });
      return null;
    }
  }

  async replyMessage(params: ReplyMessageByChannel): Promise<Message | null> {
    try {
      const { quoteMessage, message, pathsFiles } = params;

      return await quoteMessage.reply({
        content: message,
        files: pathsFiles,
      });
    } catch (error) {
      this.printError({
        message: 'Falha ao responder mensagem',
        originalMessage: error.message,
        stack: error.stack,
      });
      return null;
    }
  }

  getChannelById(channelId: string): TextChannel | null {
    return <TextChannel> this.client?.channels?.cache?.get(channelId) || null;
  }

  private printError(params: PrintErrorParams): void {
    console.log({ ...params });
  }
}
