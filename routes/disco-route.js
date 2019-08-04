const express = require('express');
const app = express();
const router = express.Router();
const discoController = require ('../controllers/disco');


  
    router.get('/discos', discoController.listDisco);
  
    router.get('/discos/:id', discoController.getDisco);
  
    router.post('/discos', discoController.createDisco);
  
    router.put('/discos/:id', discoController.updateDisco);
  
    router.delete('/discos/:id', discoController.deleteDisco);
  
    module.exports = router;
  