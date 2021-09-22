import { BaseCommandInteraction, Message } from 'discord.js';

export interface SendMessageBase {
    message: string;
    pathsFiles?: string[];
}

export interface SendMessageByChannel extends SendMessageBase {
    channelId: string;
}

export interface ReplyMessageByChannel extends SendMessageBase {
    quoteMessage: Message;
}

export interface PrintErrorParams {
    message: string;
    originalMessage: string;
    stack: string;
}

export interface Commands {
    name: string;
    description: string;
}

export interface RegisterCommands {
    guildId: string;
    clientId: string;
    commands: Commands[];
}

export interface ReplyMessageCommnad extends SendMessageBase {
    interaction: BaseCommandInteraction
}

export interface SendFileByChannel {
    channelId: string;
    pathFile: string;
}
