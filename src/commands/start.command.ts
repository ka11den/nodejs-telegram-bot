import { Markup, Telegraf } from "telegraf";
import { BotContext, Invoice } from "../type/type";
import { Command } from "./command.class";

export class StartCommand extends Command {

  constructor(bot: Telegraf<BotContext>) {
    super(bot);
  }

  getInvoice (id: number | undefined) {
    const invoice: Invoice = {
      chat_id: id,
      provider_token: process.env.PROVIDER_TOKEN,
      start_parameter: "get_access",
      title: "Title",
      description: "Desc",
      currency: 'RUB',
      prices: [{ label: "Price", amount: 100 * 100 }],
      photo_url: "https://shop.miratorg.ru/upload/resize_cache/iblock/b12/800_800_1/b12209c555dd0f0f5a64953b851ee8b8.jpg",
      photo_width: 800,
      photo_height: 900,
      payload: JSON.stringify({
        unique_id: `${id}_${Number(new Date())}`,
        provider_token: process.env.PROVIDER_TOKEN
      })
    }

    return invoice;
  }

  handle(): void {
    this.bot.start((ctx) => {
      ctx.reply(
        `Hello ${ctx.from.username} !`,
          Markup.inlineKeyboard([
          Markup.button.callback("Buy a subscription", "how_works"),
        ])
      )
    })
      
    this.bot.hears("payment", (ctx) => {
      ctx.replyWithInvoice(this.getInvoice(ctx.from.id))
    })

    this.bot.action("how_works", (ctx) => {
      ctx.replyWithInvoice(this.getInvoice(ctx.from?.id))
    })
    
    this.bot.on("pre_checkout_query", (ctx) => ctx.answerPreCheckoutQuery(true))

    this.bot.on("successful_payment", async (ctx) => {
      await ctx.reply("SuccessfulPayment")
    })
  }
}