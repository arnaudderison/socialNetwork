//importation des librairies
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/user.routes')
const postRoutes = require('./routes/post.routes')
const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require('morgan');

require('dotenv').config({ path: './config/.env' })
require('./config/db')
const {checkUser, requireAuth} = require('./middleware/auth.middleware')

const app = express()

//middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(fileUpload({
    createParentPath: true
}));
app.use(cors({
    origin: `${process.env.API_CONNECT}`,
    credentials: true,
}));
app.use(morgan('dev'));

//jwt
app.get('*', checkUser)
app.get('/jwtid', requireAuth, (req, res)=>{
    res.status(200).send(res.locals.user._id)
})

//routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes)

//server
app.listen(process.env.PORT, () => {
    console.log(`Serveur en écoute sur le port ${process.env.PORT}`)
})