import { config, DotenvParseOutput } from "dotenv";
import { GetToken } from "../type/type";

export class ConfigService implements GetToken {
  private config: DotenvParseOutput;

  constructor() {
    const { error, parsed } = config();

    if (error) throw new Error("env not found");
    if (!parsed) throw new Error("env is empty");

    this.config = parsed;
  }

  get(token: string): string {
    const res = this.config[token];
    
    if(!res) throw new Error("This value does not exist");

    return res;
  }
}