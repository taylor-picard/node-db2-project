const express = require('express');
const Cars = require('./cars-model');
const router = express.Router();

router.get('/', async (req, res, next)=> {
    try {
        const cars = await Cars.getAll();
        res.json(cars);
    } catch (err) {
        next(err);
    }
})

router.get('/:id', async (req, res, next)=> {
    try {
        const car = await Cars.getById(req.params.id);
        res.json(car);
    } catch (err) {
        next(err);
    }
})

router.post('/', async (req, res, next)=> {
    res.json('post new car');
})

module.exports = router;
