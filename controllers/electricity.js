const Electricities = require ('../models/electricities');

module.exports.createElectricities = (req, res)=> {
  var electricities = new Electricities( 
    req.body
   
  );

  electricities.save(function(err, resp) {
  if (err) {
    console.log(err);
    res.send({
    message: 'something went wrong'
    });
  } else {
    res.send({
    message: 'the Electricities has been saved'
    });
  }

  });
}
module.exports.listElectricities=(req, res)=> {
        Electricities.find({})
          .then(Electricities => res.json(Electricities))
          .catch(err => res.send(err));
      }
    
module.exports.getElectricities=(req, res)=> {
        Electricities.findById(req.params.id)
          .then(Electricities => res.json(Electricities))
          .catch(err => res.send(err));
      }
module.exports.getApprovedElectricities=(req, res)=> {
        Electricities.find({ status: 'approved' })
          .then(approvedApps => res.json(approvedApps))
          .catch(err => res.send(err));
      }
    
module.exports.updateElectricities=(req, res)=> {
        const { id } = req.params;
        Electricities.findByIdAndUpdate(id, req.body, { new: true })
          .then(updatedRecord => res.json(updatedRecord))
          .catch(err => res.send(err))
      }
    
module.exports.approveElectricities=(req, res)=> {
        const { id } = req.params;
        Electricities.findByIdAndUpdate(id, { status: 'approved' }, { new: true })
          .then(response => res.json(response))
          .catch(err => res.send(err))
      }
    
module.exports.deleteElectricities=(req, res)=> {
        const { id } = req.params;
        Electricities.deleteOne({ id })
          .then(response => res.json(response))
          .catch(err => res.send(err));
      }
  
    