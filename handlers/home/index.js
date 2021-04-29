const Tripps = require('../trips')


module.exports = {
    get: {
        home(req, res, next) {
            res.render('./home/home')
        }
    },
    post: {

    }
}