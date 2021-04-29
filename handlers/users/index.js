const User = require('./user')
const jwt = require('../../utils/jwt')
const { cookie } = require('../../config/config')
// const user = require('./user')

module.exports = {
    get: {
        login(req, res, next) {
            res.render('./users/login')
        },

        register(req, res, next) {
            res.render('./users/register')
        }
    },

    post: {
        login(req, res, next) {
            const {
                email,
                password
            } = req.body

            User.findOne({email}).then((user) => {
                return Promise.all([user.passwordMatch(password), user])
            }).then(([match, user]) => {
                if(!match) {
                    next(err) //Add validation
                    return
                }
                
                const token = jwt.createToken(user)

                res.status(201).cookie(cookie, token, {maxAge: 3600000}).redirect('/home/')
                
            })
        },

        register(req, res, next) {
            const {
                email,
                password,
                rePassword
            } = req.body

            User.create({email, password}).then(() => {
                res.redirect('/users/login')
            })
        }
    }
}