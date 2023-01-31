import passport from 'passport';
import { Strategy } from 'passport-local';
import {createHash, isValidPassword} from '../../utils/utils.js'
import {model as users} from '../../models/schema/usuarios.js'

const LocalStrategy = Strategy;




passport.use('login', new LocalStrategy(
    async(username,password,done)=>{
    const user = await users.findOne({username:username})
    if(!user){
        return done(null,false,{message:'nombre de usuario inexistente'})
    }if(!isValidPassword(user.password,password)){
        return done(null, false, { message: 'Contraseña incorrecta' })
    }
    else{
        return users.findOne({username})
    }
}))

// passport.use('login',new LocalStrategy({usernameField:'username'},async(username,password,done)=>{
//     if(!username||!password) return done(null,false,{message:"Incomplete values"})
//     let user = await users.findOne({username:username});
//     if(!user) return done(null,false,{message:"Incorrect credentials"})
//     if(!isValidPassword(user,password)) return done(null,false,{message:"Incorrect password"});
//     return done(null,user);
// }))

passport.serializeUser((user,done)=>{
    done(null,user._id)
})
passport.deserializeUser((id,done)=>{
    users.findById(id,(err,user)=>{
        done(err,user)
    })
})




// app.get('/login',auth,(req,res)=>{
//     let user= req.user;
//     if(user){ res.render('/logueado',{user})}
       
//     else{
//         console.log('user no logueado')
//         res.render('/login')
//     }
// })
// function postLogin(req,res){
//     let user = req.user;
//     res.render('logueado')
// }
// app.post('/login',passport.authenticate('login',{failureRedirect:'/falloLogin'}),postLogin)