import { Router } from "express";
import  {getSignup,getPassportLogin,postPassportLogin,postSignup,getFailsingup,getLogout,failRoute, getFaillogin} from '../controllers/controllerPassport.js'
import passport from "passport";

const passportRoutes = new Router()

passportRoutes.get('/login',getPassportLogin)

passportRoutes.post('/login',passport.authenticate('login',{failureRedirect:'/faillogin'}),postPassportLogin)

passportRoutes.get('/faillogin',getFaillogin)

passportRoutes.get('/signup',getSignup)

passportRoutes.post('/signup',passport.authenticate('signup',{failureRedirect:'/failsignup'}),postSignup)

passportRoutes.get('/faillogin',getFailsingup)


passportRoutes.get('/loguot',getLogout)


passportRoutes.get('*',failRoute)


export default passportRoutes;