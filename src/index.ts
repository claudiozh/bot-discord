import { config } from 'dotenv';
import BotDiscord from './bot-discord';

config();

BotDiscord.start({
  tokenBot: process.env.TOKEN_BOT,
  channelId: process.env.CHANNEL_ID,
});
