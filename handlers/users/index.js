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
        },
        logout(req, res, next) {
            req.user = null
            res.clearCookie(cookie).redirect('/home')
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

                res.status(201)
                    .cookie(cookie, token, {maxAge: 3600000})
                    .redirect('/home/')
                
            })
        },

        register(req, res, next) {
            const {
                email,
                password,
                rePassword
            } = req.body

            if(password !== rePassword) {
                return res.render('./users/register.hbs', {
                    message: "Your passwords don't match",
                    oldDetails: {email, password, rePassword}
                })
            }

            User.create({email, password}).then(() => {
                res.redirect('/users/login')
            })
        }
    }
}