"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var api_1 = __importDefault(require("./utils/api"));
var app = (0, express_1.default)();
app.disable('x-powered-by');
app.use((0, cors_1.default)({ origin: 'http://localhost:3000' })); // TODO: whitelist production host
app.use((0, morgan_1.default)('dev'));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(api_1.default);
exports.default = app;
