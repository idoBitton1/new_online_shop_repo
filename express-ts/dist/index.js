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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const postgraphile_1 = __importDefault(require("./postgraphile"));
const postgres_1 = __importDefault(require("./postgres"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const port = 8000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(postgraphile_1.default);
app.get('/getToken', (request, response) => {
    const { id, email, isManager } = request.query;
    let is_manager = isManager === "true" ? true : false;
    const token = jsonwebtoken_1.default.sign({ user_id: id, email: email, is_manager }, "TEMP_STRING", {
        //the token will expire in 2 hours
        expiresIn: "2h"
    });
    response.json(token);
});
app.get('/deleteFromWishlist', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, product_id } = request.query;
    try {
        const delete_product = yield postgres_1.default.query("DELETE FROM wishlist WHERE user_id=$1 AND product_id=$2", [user_id, product_id]);
    }
    catch (err) {
        console.error(err.message);
    }
}));
app.listen(port, () => {
    console.log(`now listening on port ${port}`);
});
//npm run serve
