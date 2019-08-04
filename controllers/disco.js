 const Disco = require ('../models/discos');


module.exports.createDisco=(req, res)=>{
	var disco = new Disco( 
		req.body
	   
	  );
	
	  disco.save(function(err, resp) {
	  if (err) {
		console.log(err);
		res.send({
		message: 'something went wrong'
		});
	  } else {
		res.send({
		status:true,
		message: 'the Disco has been saved'
		});
	  }
	
	  });
	}
		
module.exports.listDisco=(req, res)=>{
			Disco.find({})
			.then(Disco => res.status(200)
			.json({status:true,
				message:(Disco)}))
			.then(err => res.send(err));
		}

module.exports.getDisco=(req, res)=> {
			const { id } = req.params;
			Disco.findById(id)
				.then(Disco => res.json(Disco))
				.catch(err => res.send(err))
		}
	
module.exports.updateDisco=(req, res)=> {
			Disco.findByIdAndUpdate(req.params.id, req.body, { new: true })
				.then(updatedDisco => res.json(updatedDisco))
				.catch(err => res.send(err))
		}
	
module.exports.deleteDisco=(req, res)=> {
    const id  = req.params.id;
   	Disco.deleteOne({'_id': id })
      .then(response =>{
        if (response){
          res.status(200)
            .json({
              status:true,message:"success"
            })
        }
        else{
          res.status(201)
            .json({
              status:false,message:"failed"
            })
        }
	  })
	  .catch(err => res.send(err))
      
  }
	
