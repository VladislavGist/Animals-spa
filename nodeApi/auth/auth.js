import passport from 'passport'
import { Strategy } from 'passport-local'

import AuthClass from '../classes/auth'

const Auth = new AuthClass


// аутентификация
passport.use(new Strategy(Auth.findUser))

// генерирует id на основнии данных о юзере
passport.serializeUser((user, done) => done(null, user))

// по id восстанавливает данные о юзере
passport.deserializeUser((id, done) => done(null, { username: id }))