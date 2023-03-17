require('dotenv').config();
const path = require('path'); 
const express = require('express');  
const moongose = require('mongoose'); 
const MongoStore = require('connect-mongo') 
const session = require('express-session'); 
const flashMessages = require('connect-flash') 
const csrf = require('csurf')
const helmet = require('helmet')
const { globalMiddleware, checkCrsfError, generateCrsfToken } = require('./src/middlewares/middlewares') 
const routes = require('./routes'); 

const app = express();

moongose.set('strictQuery',true); 
moongose.connect(process.env.CONNECTIONSTRING)
    .then( () => { 
        console.log('Estabelecendo conexão ao Banco de Dados...')
        app.emit('OK') 
        console.log('Conexão estabelecida!')
    })
    .catch( e => { 
        console.log('Erro de conexão.')
        return;
    } )

const sessionOptions = session( 
    {
        secret: 'projectbase', 
        store: MongoStore.create( { mongoUrl: process.env.CONNECTIONSTRING}),
        resave: false,
        saveUninitialized: false,
        cookie: { 
            maxAge: 1000 * 60 * 60 * 24 * 7, 
            httpOnly: true
        }                              
    }
)

app.use( express.urlencoded( { extended: true } ) )
app.use( express.json() )
app.use( express.static( path.resolve(__dirname,'public') ) )
app.use(sessionOptions) 
app.use(flashMessages())
app.use(csrf())
app.use(helmet())
app.use(globalMiddleware )
app.use(checkCrsfError)
app.use(generateCrsfToken)
app.use(routes);


app.set('views', path.resolve(__dirname,'src','views'));
app.set('view engine', 'ejs'); 
                               
app.on('OK', () => {
    app.listen(3000, () => {
        console.log(`Listener na porta 3000`);
        console.log('http://localhost:3000');
    })
})


