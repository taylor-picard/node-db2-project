const Cars = require('./cars-model');
const vinValid = require('vin-validator');

const checkCarId = async (req, res, next) => {
  try {
    const car = await Cars.getById(req.params.id);
    if(!car){
      res.status(404).json({
        message: `car with id ${req.params.id} is not found`
      })
    }else{
      req.car = car;
      next();
    }
  } catch(err){
    next(err)
  }
}

const checkCarPayload = async (req, res, next) => {
  try{
    const {vin, make, model, mileage} = req.body;
    if(!vin){
      res.status(400).json({
        message: `vin is missing`
      })
    }else if(!make){
      res.status(400).json({
        message: `make is missing`
      })
    }else if(!model){
      res.status(400).json({
        message: `model is missing`
      })
    }else if(!mileage){
      res.status(400).json({
        message: `mileage is missing`
      })
    }else{
      // req.vin =vin;
      // req.make = make;
      // req.model = model;
      // req.mileage = mileage;
      next();
    }
  }catch(err){
    next(err);
  }
}

const checkVinNumberValid = (req, res, next) => {
  const valid = vinValid.validate(req.body.vin);
  if(!valid){
    res.status(400).json({
      message: `vin ${req.body.vin} is invalid`
    })
  }else{
    next();
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  try{
    const existing = await Cars.getByVin(req.body.vin);
    if(!existing){
      next();
    }else{
      res.status(400).json({
        message: `vin ${req.body.vin} already exists`
      })
    }
  }catch(err){
    next(err);
  }
}

module.exports = {
  checkCarId,
  checkCarPayload, 
  checkVinNumberValid,
  checkVinNumberUnique
}