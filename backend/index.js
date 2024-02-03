const connectToMongo= require('./db');
var cors = require('cors')
connectToMongo();




const express = require('express')
const app = express()
require("dotenv").config();

const port = process.env.PORT || 8000;

app.use(cors())
app.use(express.json())
//Avaible routes
app.use('/api/auth',require('./routes/auth.js'))
app.use('/api/notes',require('./routes/notes.js'))
app.listen(port, () => {
  console.log(`inotebook backend listening on port ${port}`)
})
