const express = require("express")
const CarsRouter = require('./cars/cars-router');

const server = express()

server.use(express.json());

server.use('/api/cars', CarsRouter);

server.use('*', (req, res, next)=> {
    next({status: 404, message: 'Not found'})
})
server.use((err, req, res, next)=> {
    res.status(err.status || 500).json({
        message: err.message
    })
})

module.exports = server
