"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartCommand = void 0;
const telegraf_1 = require("telegraf");
const command_class_1 = require("./command.class");
class StartCommand extends command_class_1.Command {
    constructor(bot) {
        super(bot);
    }
    getInvoice(id) {
        const invoice = {
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
        };
        return invoice;
    }
    handle() {
        this.bot.start((ctx) => {
            ctx.reply(`Hello ${ctx.from.username} !`, telegraf_1.Markup.inlineKeyboard([
                telegraf_1.Markup.button.callback("Buy a subscription", "how_works"),
            ]));
        });
        this.bot.hears("payment", (ctx) => {
            ctx.replyWithInvoice(this.getInvoice(ctx.from.id));
        });
        this.bot.action("how_works", (ctx) => {
            var _a;
            ctx.replyWithInvoice(this.getInvoice((_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id));
        });
        this.bot.on("pre_checkout_query", (ctx) => ctx.answerPreCheckoutQuery(true));
        this.bot.on("successful_payment", (ctx) => __awaiter(this, void 0, void 0, function* () {
            yield ctx.reply("SuccessfulPayment");
        }));
    }
}
exports.StartCommand = StartCommand;
