"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WHATSAPP_API_URL = exports.WHATSAPP_API_KEY = exports.OMIE_APP_SECRET = exports.OMIE_API_KEY = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.OMIE_API_KEY = process.env.OMIE_API_KEY || "";
exports.OMIE_APP_SECRET = process.env.OMIE_APP_SECRET || "";
exports.WHATSAPP_API_KEY = process.env.WHATSAPP_API_KEY || "";
exports.WHATSAPP_API_URL = process.env.WHATSAPP_API_URL || "";
