import { Telegraf } from "telegraf";
import LocalSession from "telegraf-session-local";

import { ConfigService } from "./config/config.service";
import { Command } from "./commands/command.class";
import { StartCommand } from "./commands/start.command";
import { BotContext, GetToken } from "./type/type";

class Bot {

  bot: Telegraf<BotContext>;
  commands: Command[] = []

  constructor(private readonly configService: GetToken) {
    this.bot = new Telegraf<BotContext>(this.configService.get("TOKEN"));
    this.bot.use(
      new LocalSession({database: 'db.json'}).middleware()
    )
  }

  init() {
    try {
      this.commands = [new StartCommand(this.bot)]

      for(const command of this.commands) {
        command.handle()
      }
      
      this.bot.launch();
      console.log("The bot is running!")
    } catch (err) {
      console.log(err)
    }    
  }
}

const bot = new Bot(new ConfigService());

bot.init();