const express = require('express');
const app = express();
const router = express.Router();
const yorubaController = require ('../controllers/yoruba');

    router.get('/yoruba', yorubaController.listYoruba);
  
    router.get('/yoruba/:id', yorubaController.getYoruba);
  
    router.post('/yoruba', yorubaController.createYoruba);
  
    router.put('/yoruba/:id', yorubaController.updateYoruba);
  
    router.delete('/yoruba/:id', yorubaController.deleteYoruba);
  
    module.exports = router;
  