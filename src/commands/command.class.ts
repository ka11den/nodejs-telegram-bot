import { Telegraf } from "telegraf";
import { BotContext } from "../type/type";

export abstract class Command {
  constructor(public bot: Telegraf<BotContext>) {}

  abstract handle(): void
}