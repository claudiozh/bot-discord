import { config } from 'dotenv';
import AppDiscord from './app-discord';
// import BotDiscord from './bot-discord';

config();

// BotDiscord.start({
//   tokenBot: process.env.TOKEN_BOT,
//   channelId: process.env.CHANNEL_ID,
// });

const appDiscord = new AppDiscord();

appDiscord.login(process.env.TOKEN_BOT);

setTimeout(() => {
  appDiscord.sendMessageTextByChannel({
    channelId: process.env.CHANNEL_ID,
    message: 'Hello world',
  });
}, 3000);
