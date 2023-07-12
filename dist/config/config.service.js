"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const dotenv_1 = require("dotenv");
class ConfigService {
    constructor() {
        const { error, parsed } = (0, dotenv_1.config)();
        if (error)
            throw new Error("env not found");
        if (!parsed)
            throw new Error("env is empty");
        this.config = parsed;
    }
    get(token) {
        const res = this.config[token];
        if (!res)
            throw new Error("This value does not exist");
        return res;
    }
}
exports.ConfigService = ConfigService;
