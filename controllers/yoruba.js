const Yoruba = require ('../models/yoruba');


module.exports.createYoruba=(req, res)=>{
	var yoruba = new Yoruba( 
		req.body
	   
	  );

	  yoruba.save(function(err, resp) {
	  if (err) {
		console.log(err);
		res.send({
		message: 'something went wrong'
		});
	  } else {
		res.send({
		status:true,
		message: 'the Yoruba text has been saved'
		});
	  }
	
	  });
	}
		
module.exports.listYoruba=(req, res)=>{
			Yoruba.find({})
			.then(Yoruba => res.status(200)
			.json({status:true,
				message:(Yoruba)}))
			.catch(err => res.send(err));
		}

module.exports.getYoruba=(req, res)=> {
			const { id } = req.params;
			Yoruba.findById(id)
				.then(Yoruba => res.json(Yoruba))
				.catch(err => res.send(err))
		}
	
module.exports.updateYoruba=(req, res)=> {
			Yoruba.findByIdAndUpdate(req.params.id, req.body, { new: true })
				.then(updatedYoruba => res.json(updatedYoruba))
				.catch(err => res.send(err))
		}
	
module.exports.deleteYoruba=(req, res)=> {
	const id  = req.params.id;
	Yoruba.deleteOne({'_id': id })
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
		
	
