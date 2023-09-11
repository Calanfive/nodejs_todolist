"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
require("sequelize");
const sequelize_1 = require("sequelize");
const app = (0, express_1.default)();
const port = 3000;
// paramètres .env pour connexion postgres
// const db_host = process.env.DB_HOST as string; 
// const db_name = process.env.DB_NAME as string;
// const db_username = process.env.DB_USERNAME as string;
// const db_port = process.env.DB_PORT as string;
// const db_pswd = process.env.DB_PASSWORD as string;
// connexion database 
const sequelize = new sequelize_1.Sequelize({
    dialect: "sqlite",
    storage: "./db.sqlite",
});
// création d'un modele
const Todo = sequelize.define("Todo", {
    nameOFtask: {
        type: sequelize_1.DataTypes.STRING,
    },
    statusOFtask: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
}, {
    timestamps: false,
});
sequelize
    .sync({ force: true })
    .then(() => {
    console.log('La synchronisation a réussi.');
    Todo.create({
        nameOFtask: "input",
        statusOFtask: true,
    })
        .then((todo) => {
        console.log("todo", todo);
        Todo.findAll().then((todos) => {
            console.log("todos", todos);
        });
    });
})
    .catch(error => {
    console.error('Erreur de synchronisation:', error);
});
app.get('/random-between/:min/:max', (req, res) => {
    const min = parseInt(req.params.min);
    const max = parseInt(req.params.max);
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log('number' + random);
    res.send(random.toString());
});
// Ajout de l'input dans la bdd
app.get('/add/:nom', (req, res) => {
    const messageAstocker = req.params.nom;
    Todo.create({
        nameOFtask: messageAstocker,
        statusOFtask: false,
    });
    res.send(messageAstocker);
});
// Modifier statusOFtask: false to true 
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
