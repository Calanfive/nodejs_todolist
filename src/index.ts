import express from "express";
import 'dotenv/config'
import 'sequelize';
import { DataTypes, Sequelize } from "sequelize";
import { cp } from "fs";
import { log } from "console";

const app = express();
const port = 3000;

// paramètres .env pour connexion postgres
// const db_host = process.env.DB_HOST as string; 
// const db_name = process.env.DB_NAME as string;
// const db_username = process.env.DB_USERNAME as string;
// const db_port = process.env.DB_PORT as string;
// const db_pswd = process.env.DB_PASSWORD as string;


// connexion database 
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./db.sqlite",
  })
  
  // création d'un modele
  const Todo = sequelize.define("Todo", {
    nameOFtask: {
      type: DataTypes.STRING,
    },
    statusOFtask: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    timestamps: false,
  })
  
  sequelize
    .sync({ force: true })
    .then(() => {
      console.log('La synchronisation a réussi.');
      Todo.create({
        nameOFtask: "input",
        statusOFtask: true,
      })
      .then((todo) => {
        console.log("todo", todo)
        Todo.findAll().then((todos) => {
          console.log("todos", todos)
        })
      })
    })
    .catch(error => {
      console.error('Erreur de synchronisation:', error);
    });

    
    app.get('/random-between/:min/:max', (req, res) => {
        const min = parseInt(req.params.min)
        const max = parseInt(req.params.max)
        const random = Math.floor(Math.random() * (max - min + 1)) + min
        console.log('number' + random);
        res.send(random.toString())
      })
      
      // Ajout de l'input dans la bdd
      app.get('/add/:nom', (req, res) => {
        const messageAstocker = req.params.nom
    
        Todo.create({
          nameOFtask: messageAstocker,
          statusOFtask: false,
      })
        res.send(messageAstocker);
      })

      // Selection get-all
      app.get('/get-all/', async (req, res) => {
        const getall = await Todo.findAll()
        console.log(JSON.stringify(getall));
        res.send(getall);
      })

      // Modifier statusOFtask: false to true 
      app.put("/update/:id/:new_status", async (req, res) => {
          let id_to_update = req.params.id;
          let new_status = req.params.new_status;

          await Todo.update({ statusOFtask: new_status }, {
            where: {
              id: id_to_update
            }
          });
          res.send(200);
      });

      // Supprimer une ligne par l'id
      app.put("/remove/:id", async (req, res) => {
        const deleteTask = req.params.id;

        await Todo.destroy({
          where: {
            id: deleteTask
          }
        });
        res.send('task deleted');
      });

      // Supprimer l'ensemble des lignes
      app.get('/remove-all', async (req, res) => {
        const todos = await Todo.findAll()
        for (let index = 0; index < todos.length; index++) {
        const element = todos[index];
        await element.destroy()
        }
        res.send('all tasks removed')
      })
    
      app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
      })
      
      