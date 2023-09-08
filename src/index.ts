import express from "express";
import 'dotenv/config'

const app = express();
const port = 3000

app.get('/test/:min/:max', (req, res) => {
    console.log('toto');
    
    const min = parseInt(req.params.min)
    const max = parseInt(req.params.max)
    const random = Math.floor(Math.random() * (max - min + 1)) + min
    res.send(random.toString())
  })
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })