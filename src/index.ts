import { config } from 'dotenv';
import AppDiscord from './bot-discord';

config();

const commands = [
  {
    name: 'restart',
    description: 'Restart server',
  },
];

async function start() {
  const appDiscord = new AppDiscord();

  appDiscord.onReady(() => {
    appDiscord.onCommand((interaction, command) => {
      if (command === 'restart') {
        appDiscord.replyMessageCommnad({
          interaction,
          message: 'Restartando canais',
        });
      }
    });
  });

  await appDiscord.login(process.env.TOKEN_BOT);

  appDiscord.registerCommands({
    clientId: process.env.CLIENT_ID,
    guildId: process.env.GUILD_ID,
    commands,
  });
}

start();
