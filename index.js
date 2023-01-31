import mongoose from 'mongoose';
import * as model from './models/schema/usuarios.js'
import express from 'express';
import UsersDao from './models/daos/userDaos.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
// import { session}  from 'session-file-store';
import passport from 'passport';
import './midllewares/pasport/login.js';
import './midllewares/pasport/singup.js'
import {engine} from 'express-handlebars'
import path from 'path';
import {fileURLToPath} from 'url';
import cluster from 'cluster';
import os from 'os'
import { faker } from '@faker-js/faker';
import passportRoutes from './routes/routesPassport.js';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.argv[2] || 8080;
const modo = process.argv[3] === 'CLUSTER';



const { commerce, image} = faker

const app = express();
const Api = new UsersDao()

app.engine('hbs',engine({
    extname:'hbs', 
    defaultLayout:'signup.hbs', 
    layoutsDir:path.resolve(__dirname+ '/views/layouts'), 
    partialsDir:path.resolve(__dirname+'/views/partials/') 
})
)

// app.engine('handlebars',engine());

app.set('views',__dirname+'/views');
//app.set("views","./views");

app.set("view engine","hbs");//motor de plantilla que se utiliza

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

/* ACA ESTAN LAS SESSIONS A REEMPLAZAR */

// app.use(session({
//     store:MongoStore.create({
//         mongoUrl:`mongodb+srv://matias:${config.mongo.PWD}@cluster0.tqiapux.mongodb.net/session?retryWrites=true&w=majority`
//     }),
//     secret:'noesunacokie',
//     cookie:{maxAge:600000},
//     resave:false,
//     saveUninitialized:false
// }))

app.use(session({
    // store: new session({path: './sessiones',ttl:300,retries:0}),
    secret:'shshsh',
    cookie:{
        httpOnly:false,
        secure:false,
    },
    rolling:true,
    resave:true,
    saveUninitialized:true
}))

app.use(passport.initialize());
app.use(passport.session())


app.use(passportRoutes)

// app.listen(8080,()=>{
//         mongoose.set('strictQuery', false);
//         console.log('Escuchando el puerto 8080');
// })


//RUTAS DE LOGIN

// app.get('/login',(req,res)=>{
//     if(req.isAuthenticated()){
//         let user = req.user;
//         console.log('user logueado')
//         //redirigo al profiler
//         return res.render("layouts/main")
//     }else{
//         console.log('user no logueado')
//         return res.render("layouts/login")
//     }

// })

// app.post('/login',passport.authenticate('login',{failureRedirect:'/faillogin'}),(req,res)=>{
//     let user = req.user
//     res.render("layouts/main")
// })

// //RUTAS DE SINGUP
// app.get('/prueba',(req,res)=>{
//     res.render("layouts/login.hbs")
// })

// app.get('/signup',(req,res)=>{
//     res.render('layouts/signup')
// })

// app.post('/signup',passport.authenticate('signup',{failureRedirect:'/failsignup'}),(req,res)=>{
//     let user = req.user
//     res.render("layouts/main")
// })

// app.post('/guardando', async (req,res)=>{
//     // console.log('cambio de pagina')
//     try {
//         const {username,password}=req.body;
//         // const user=JSON.stringify(username)

//         req.session.user=username;
//         req.session.password=password;

//         const newUser = {
//             username,
//             password
//         }
//         // const usuarioSave= new model.usuarios(newUser)
//         // let save =await usuarioSave.save()
//         // console.log(save)
//         Api.save(newUser)
//         res.send('usuario guardado felicitaciones')
        
//     } catch (error) {
//         console.log(error)
//     }
    
// })

app.get('/api/products-test',(req,res)=>{
    const data =[]
    const userlog= req.user
    for (let i = 0; i < 5; i++) {
        let name = commerce.productName();
        let price = commerce.price();
        let photo = image.technics(640, 480, true);

        data.push({name: name, price: price, photo: photo})
    }
    res.render("products",{
        productos:data,
        hayProductos:data.length,
        userlog
    });
})

if (modo && cluster.isPrimary) {
    const cpus = os.cpus.length;
    for (let i = 0; i < cpus; i++) {
        cluster.fork();
    }
    cluster.on('exit',(worker,code)=>{
        cluster.fork() //si se cae el proceso se vuelve a crear automaticamente
    })
}else{
    app.listen(PORT, () => {
        console.log(`${process.pid} => server is runing in ${PORT} in mod FORK`);
    })
}

// mongo()

// async function mongo() {
//     try {
//         const URL = "mongodb+srv://matias:matias2001@cluster0.tqiapux.mongodb.net/?retryWrites=true&w=majority"
//         mongoose.set('strictQuery', false);
//         let on = await mongoose.connect(URL)
//         console.log('conectado a la base de datos');
//     } catch (error) {
//         console.log(error);
//     }
// }

// guardar()


// async function guardar() {
    //     try {
        //         const usuario = { username: "nicolas", password: "guardate123" }
        //         const usuarioSave = new model.usuarios(usuario)
        //         let save = await usuarioSave.save()
        //         console.log(save)
        //     } catch (error) {
            //         console.log(error)
            //     }
            
            // }
            
            // mostralo ()
            
            // async function mostralo() {
                //     try {
                    //         const mostrar = await model.usuarios.find({})
                    //         console.log(mostrar)
                    //     } catch (error) {
                        //         console.log(error)
                        //     }
                        
                        // }