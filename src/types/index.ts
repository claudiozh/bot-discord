import { BaseCommandInteraction, Message } from 'discord.js';

// eslint-disable-next-line no-unused-vars
export type OnMessageCreateType = (message: Message) => void;

// eslint-disable-next-line no-unused-vars
export type OnMessageUpdateType = (oldMessage: Message, newMessage: Message) => void;

// eslint-disable-next-line no-unused-vars
export type OnMessageDeleteType = (message: Message) => void;

// eslint-disable-next-line no-unused-vars
export type OnInteractionCreateType = (fnReply: Promise<Message>, commandName: string) => void;

// eslint-disable-next-line no-unused-vars
export type OnCommand = (interaction: BaseCommandInteraction, command: string, reply?: Function) => void
