"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var config = {
    isDevelopment: process.env.NODE_ENV !== 'production',
    server: {
        port: process.env.PORT,
        db: {
            projectId: process.env.PROJECT_ID,
            clientEmail: process.env.CLIENT_EMAIL,
            privateKey: process.env.PRIVATE_KEY,
        },
    },
};
exports.default = config;
