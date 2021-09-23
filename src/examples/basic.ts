import { config } from 'dotenv';
import BotDiscord from '../bot-discord';

config();

const commands = [
  {
    name: 'ping',
    description: 'Command ping',
  },
];

async function start() {
  const botDiscord = new BotDiscord();
  const {
    TOKEN_BOT, CHANNEL_ID, CLIENT_ID, GUILD_ID,
  } = process.env;

  botDiscord.onReady(() => {
    botDiscord.onMessageCreate((message) => {
      console.log(`Message created: ${message}`);

      if (message.content === 'newMessageText') {
        botDiscord.sendMessageByChannel({
          channelId: CHANNEL_ID,
          message: 'Nova mensagem',
        });
      }
    });

    botDiscord.onMessageDelete((message) => {
      console.log(`Message deleted: ${message}`);
    });

    botDiscord.onMessageUpdate((message) => {
      console.log(`Message updated: ${message}`);
    });

    botDiscord.onCommand((interaction, command) => {
      if (command === 'restart') {
        botDiscord.replyMessageCommnad({
          interaction,
          message: 'pong',
        });
      }
    });

    botDiscord.registerCommands({
      clientId: CLIENT_ID,
      guildId: GUILD_ID,
      commands,
    });
  });

  botDiscord.login(TOKEN_BOT);
}

start();
