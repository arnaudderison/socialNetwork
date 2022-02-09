//importation des librairies
const express = require('express')

//importation + configiration du fichier des variables d'environnement
require('dotenv').config({ path: './config/.env' })
require('./config/db')

const app = express()

app.listen(process.env.PORT, () => {
    console.log(`Serveur en écoute sur le port ${process.env.PORT}`)
})