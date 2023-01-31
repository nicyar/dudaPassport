import { model } from "mongoose";
import passport from "passport";
import { Strategy } from "passport-local";
import { model as users } from "../../models/schema/usuarios.js";
import { createHash, isValidPassword } from '../../utils/utils.js'

const LocalStrategy = Strategy;



passport.serializeUser((user, done) => {
    done(null, user._id)
})
passport.deserializeUser((id, done) => {
    users.findById(id, (err, user) => {
        done(err, user)
    })
})

passport.use('signup', new LocalStrategy(
    async (username, password, done) => {
        const user = await users.findOne({username:username})

        if (user) {
            let err = "el nombre de usuario ya existe"
            return err;
        } else {

            try {
                const newUser = new users()
                newUser.username = username
                newUser.password = createHash(password)


                // req.session.user = newUser

                const persona = await newUser.save()

                return done(null, persona)
            } catch (error) {
                console.log(error)
            }

        }
    }

))

