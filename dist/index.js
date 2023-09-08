"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const app = (0, express_1.default)();
const port = 3000;
app.get('/random-between/:min/:max', (req, res) => {
    console.log('toto');
    const min = parseInt(req.params.min);
    const max = parseInt(req.params.max);
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    res.send(random.toString());
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
