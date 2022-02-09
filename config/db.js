const mongoose = require("mongoose")
//connexion a la base de donner
mongoose
    .connect("mongodb+srv://" + process.env.DB_USER_PASS + "@cluster0.039jg.mongodb.net/socialNetwork")
    .then(() => console.log('Connecté a la base de donné'))
    .catch((err) => console.log("Erreur de connexion :", err))