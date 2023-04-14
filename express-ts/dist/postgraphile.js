"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgraphile_1 = __importDefault(require("postgraphile"));
const { DATABASE, USER, PASSWORD, HOST, PORT } = process.env;
const tmp_CLIENT = "pg";
const tmp_USER = "postgres";
const tmp_PASSWORD = "mpmpiv100";
const tmp_HOST = "localhost";
const tmp_PORT = 5432;
const tmp_DATABASE = "shop_me_online";
const config = (0, postgraphile_1.default)({
    database: tmp_DATABASE,
    user: tmp_USER,
    password: tmp_PASSWORD,
    host: tmp_HOST,
    port: tmp_PORT,
}, 'public', {
    watchPg: true,
    graphiql: true,
    enhanceGraphiql: true,
});
exports.default = config;
