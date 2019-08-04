const express = require('express');
const app = express();
const router = express.Router();
const roleController = require ('../controllers/role');


  
    router.get('/roles', roleController.listRole);
  
    router.get('/roles/:id', roleController.getRole);
  
    router.post('/roles', roleController.createRole);
  
    router.put('/roles/:id', roleController.updateRole);
  
    router.delete('/roles/:id', roleController.deleteRole);
  
    module.exports = router;
  