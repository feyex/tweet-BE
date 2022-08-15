const Role = require ('../models/role');


module.exports.createRole=(req, res)=>{
	var role = new Role( 
		req.body
	   
	  );
	
	  role.save(function(err, resp) {
	  if (err) {
		console.log(err);
		res.send({
		message: 'something went wrong'
		});
	  } else {
		res.send({
		status:true,
		message: 'the Role has been saved'
		});
	  }
	
	  });
	}
		
module.exports.listRole=(req, res)=>{
			Role.find({})
			.then(Role => res.status(200)
			.json({status:true,
				message:(Role)}))
			.then(err => res.send(err));
		}

module.exports.getRole=(req, res)=> {
			const { id } = req.params;
			Role.findById(id)
				.then(Role => res.json(Role))
				.catch(err => res.send(err))
		}
	
module.exports.updateRole=(req, res)=> {
			Role.findByIdAndUpdate(req.params.id, req.body, { new: true })
				.then(updatedRole => res.json(updatedRole))
				.catch(err => res.send(err))
		}
	
module.exports.deleteRole=(req, res)=> {
    const id  = req.params.id;
   	Role.deleteOne({'_id': id })
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

  /**
 * Seed the database
 */
module.exports.seedRole = (req, res) => {
	// create some events
	const role = [
	  { role: 'user' },
	  { role: 'admin' }
	];
  
	// use the Event model to insert/save
	Role.deleteOne({}, () => {
	  for (roles of role) {
		var newRole = new Role(role);
		newRole.save();
	  }
	});
  
	// seeded!
	res.send('Database seeded!');
  }
	
