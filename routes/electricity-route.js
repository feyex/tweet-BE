const express = require('express');
const app = express();
const router = express.Router();

const electricitiesController = require ('../controllers/electricity');

  
    router.get('/electricities', electricitiesController.listElectricities);
  
    router.get('/electricities/approved', electricitiesController.getApprovedElectricities);
  
    router.get('/electricities/:id', electricitiesController.getElectricities);
  
    router.post('/electricities', electricitiesController.createElectricities);
  
    router.put('/electricities/:id/approve', electricitiesController.approveElectricities);
  
    router.put('/electricities/:id', electricitiesController.updateElectricities);
  
    router.delete('/electricities/:id', electricitiesController.deleteElectricities);
  
    module.exports = router;