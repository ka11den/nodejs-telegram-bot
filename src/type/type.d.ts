import { Context } from "telegraf";

type Invoice = {
  chat_id: number | undefined,
  provider_token: any,
  start_parameter: string;
  title: string;
  description: string;
  currency: string;
  prices: any;
  photo_url: string;
  photo_width: number;
  photo_height: number;
  payload: string;
}

export type SessionData = {
  test: boolean;
}

export type GetToken = {
  get(token: string): string;
}

export interface BotContext extends Context {
  session: SessionData;
}