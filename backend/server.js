const express = require('express')
const app = express()

const db = require("./config/db_config.js")

let router = require("./routes/router.js")

const cors = require("cors")

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(express.static('resources'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/", router)

const server = app.listen(8080,  () => {

    let host = server.address().address
    let port = server.address().port
    db.sequelize.sync()
    console.log(`O app está executando em http://${host}:${port}`)
    
})