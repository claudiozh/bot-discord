import { Message } from 'discord.js';
import { config } from 'dotenv';
import AppDiscord from './app-discord';

config();

function start() {
  const appDiscord = new AppDiscord();

  appDiscord.login(process.env.TOKEN_BOT);

  appDiscord.onReady(async () => {
    appDiscord.onMessageCreate(async (message: Message) => {
      console.log('Message: ', message);
    });

    appDiscord.onMessageDelete((message: Message) => {
      console.log('Message deleted: ', message);
    });

    appDiscord.onMessageUpdate((message: Message) => {
      console.log('Message updated: ', message);
    });
  });
}

start();
