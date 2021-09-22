import {
  Client, Intents, Message, TextChannel,
} from 'discord.js';

import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

import {
  PrintErrorParams,
  RegisterCommands,
  ReplyMessageByChannel,
  ReplyMessageCommnad,
  SendFileByChannel,
  SendMessageByChannel,
} from './interfaces/index';

import {
  OnCommand,
  OnMessageCreateType,
  OnMessageDeleteType,
  OnMessageUpdateType,
} from './types';

export default class AppDiscord {
  private client: Client;

  private tokenBot: string;

  constructor() {
    this.client = new Client({
      intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    });
  }

  async login(tokenBot: string): Promise<boolean> {
    try {
      await this.client.login(tokenBot);
      this.tokenBot = tokenBot;
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

  async sendFileByChannel(params: SendFileByChannel): Promise<Message|null> {
    try {
      const { channelId, pathFile } = params;
      const channel = this.getChannelById(channelId);
      await channel.sendTyping();

      return await channel.send({
        files: [pathFile],
      });
    } catch (error) {
      this.printError({
        message: 'Falha ao enviar midia',
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

  async replyMessageCommnad(params: ReplyMessageCommnad): Promise<void> {
    try {
      const { message, pathsFiles, interaction } = params;

      await interaction.reply({
        content: message,
        files: pathsFiles,
      });
    } catch (error) {
      this.printError({
        message: 'Falha ao responder mensagem de comando.',
        originalMessage: error.message,
        stack: error.stack,
      });
    }
  }

  async registerCommands(params: RegisterCommands): Promise<boolean> {
    const { guildId, clientId, commands } = params;

    const commandsBuilder = commands.map(({ name, description }) => new SlashCommandBuilder()
      .setName(name.replace(/\s/g, ''))
      .setDescription(description)
      .toJSON());

    const rest = new REST({ version: '9' }).setToken(this.tokenBot);

    try {
      await rest.put(
        Routes.applicationGuildCommands(clientId, guildId),
        { body: commandsBuilder },
      );
      return true;
    } catch (error) {
      this.printError({
        message: 'Falha ao registrar commando',
        originalMessage: error.message,
        stack: error.stack,
      });
      return false;
    }
  }

  async onCommand(fnCallback: OnCommand) {
    try {
      this.client.on('interactionCreate', async (interaction) => {
        if (!interaction.isCommand()) return;

        const { commandName } = interaction;

        fnCallback(interaction, commandName);
      });
    } catch (error) {
      this.printError({
        message: 'Falha ao interagir via comando',
        originalMessage: error.message,
        stack: error.stack,
      });
    }
  }

  getChannelById(channelId: string): TextChannel | null {
    return <TextChannel> this.client?.channels?.cache?.get(channelId) || null;
  }

  private printError(params: PrintErrorParams): void {
    console.error({ ...params });
  }
}
