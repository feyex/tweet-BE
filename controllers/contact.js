const Contact = require ('../models/contact');


module.exports.createContact=(req, res)=>{
	var contact = new Contact( 
		req.body
	   
	  );
	
	  contact.save(function(err, resp) {
	  if (err) {
		console.log(err);
		res.send({
		message: 'something went wrong'
		});
	  } else {
		res.send({
		message: 'the Contact has been saved'
		});
	  }
	
	  });
	}
		
module.exports.listContact=(req, res)=>{
			Contact.find({})
			.then(Contact => res.status(200)
			.json({status:true,
				message:(Contact)}))
			.then(err => res.send(err));
		}

module.exports.getContact=(req, res)=> {
			const { id } = req.params;
			Contact.findById(id)
				.then(Contact => res.json(Contact))
				.catch(err => res.send(err))
		}
	
module.exports.updateContact=(req, res)=> {
			Contact.findByIdAndUpdate(req.params.id, req.body, { new: true })
				.then(updatedContact => res.json(updatedContact))
				.catch(err => res.send(err))
		}
	
module.exports.deleteContact=(req, res)=> {
			const { id } = req.params;
			Contact.deleteOne({ id })
				.then(response => res.json(response))
				.catch(err => res.send(err));
		}
	
		
	
