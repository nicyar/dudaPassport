
import UsersDao from "../models/daos/userDaos.js";
import { createHash } from "../utils/utils.js";
// import { serializeUser } from "passport";
// import { deserializeUser } from "passport";
const Api = new UsersDao()

const getPassportLogin =async(req,res)=>{
    if(req.isAuthenticated()){
        let user = req.user;
        console.log('usuario logueado')
        return res.send('usuario logueado')       
    }
    else{
        console.log('user no logueado')
        return res.render("layouts/signup")
    }
}

const postPassportLogin = async(req,res)=>{
    let user = req.user
    res.render("layouts/main")
}
const getSignup =async(req,res)=>{
    res.render("layouts/signup.hbs")
}
const postSignup= async(req,res)=>{
    let user = req.user;
    res.render("layouts/main.hbs")
}

const getFaillogin =async(req,res)=>{
    console.log('error en el login');
    res.render('login-error',{})
}

const getFailsingup=async(req,res)=>{
    console.log('error en signup');
    res.render('signup-error',{})
}

const getLogout =async (req,res)=>{
    req.logout();
    res.render('index')
}

const failRoute=async (req,res)=>{
    res.status(404).render('routing-error',{})
}
// const postPassportSignup =(req,res)=>{
//     try {
//       const {username,password}=req.body;
//         // const user=JSON.stringify(username)
//         const p = {
//             username,
//             password:createHash(password)
//         }

//         req.session.user=p
// /* ES INECESARIO QUE LO GUARDE ACA SI YA LO GUARDE EN EL MIDLEWARE */

//         // req.session.user=username;
//         // req.session.password=password;
        
//         // const newUser = {
//         //     username,
//         //     password:createHash(password)
//         // }
//         // // const usuarioSave= new model.usuarios(newUser)
//         // // let save =await usuarioSave.save()
//         // // console.log(save)
//         // Api.save(newUser)
//         res.send('usuario guardado felicitaciones')
        
//     } catch (error) {
//         console.log(error)
//         res.render('el usuario no pudo ser guardado exitosamente')
//     }
    
// }

export {getSignup,getPassportLogin,postPassportLogin,postSignup,getFaillogin,getFailsingup,getLogout,failRoute}