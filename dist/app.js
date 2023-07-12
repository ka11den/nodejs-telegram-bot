"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const telegraf_session_local_1 = __importDefault(require("telegraf-session-local"));
const config_service_1 = require("./config/config.service");
const start_command_1 = require("./commands/start.command");
class Bot {
    constructor(configService) {
        this.configService = configService;
        this.commands = [];
        this.bot = new telegraf_1.Telegraf(this.configService.get("TOKEN"));
        this.bot.use(new telegraf_session_local_1.default({ database: 'db.json' }).middleware());
    }
    init() {
        try {
            this.commands = [new start_command_1.StartCommand(this.bot)];
            for (const command of this.commands) {
                command.handle();
            }
            this.bot.launch();
            console.log("The bot is running!");
        }
        catch (err) {
            console.log(err);
        }
    }
}
const bot = new Bot(new config_service_1.ConfigService());
bot.init();
