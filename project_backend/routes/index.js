const UserRouter = require('./UserRouter')
const BookRouter = require('./BookRouter')
const NXB = require('./NxbRouter')
const themuonsach = require('./themuonsachRouter')


const routes = (app) => {
    app.use('/api/user', UserRouter)
    app.use('/api/book', BookRouter)
    app.use('/api/NXB', NXB)
    app.use('/api/themuonsach', themuonsach)
}

module.exports = routes