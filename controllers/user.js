const User = require('../models/users');
const config = require('../config/config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports.createUser = (req, res) => {
	var user = new User({
		//need to add user details
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		email: req.body.email,
		phoneNumber: req.body.phoneNumber,
		password: req.body.password,
		role: req.body.role,
		referral: req.body.referral

	});


	user.save(function (err, resp) {
		if (err) {
			res.status(201)
			.json({
				message: 'something went wrong '
			})
		} else {
			res.status(200)
			.json({
				status: true,
				message: 'user saved successful'
			})
		}

	})
	.catch(err => res.send(err));
}

module.exports.listUsers = (req, res) => {
	User.find({})
		.then(user => res.status(200)
			.json({
				status: true,
				message: (user)
			}))
		.catch(err => res.send(err));
}

module.exports.getUser = (req, res) => {
	const { id } = req.params;

	// only allow admins to access other user records
   
	User.findById(id)
		.then(user => res.status(200)
			.json({
				status: true,
				message: (user)
			}))
		.catch(err => res.send(err));
}

module.exports.updateUser = (req, res) => {
	User.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.then(user => res.status(200)
			.json({
				status: true,
				message: (user)
			}))
		.catch(err => res.send(err));
}

module.exports.deleteUser = (req, res) => {
	let id = req.params.id
	User.deleteOne(id)
	  .then(user=> {
		res.status(200).json({
		  status: true,
		  msg: 'user deleted successfully'
		})
	  })
	.catch(err => res.send(err));
  }
  

module.exports.login = (req, res) => {
	const email = req.body.email;

	User.findOne({ 'email': email })
		.then(async (user) => {
			if (!user) {
				return res.status(200).send({
					message: 'email does not exist'
				});
			}
			else {
				const password = req.body.password;
				bcrypt.compare(password, user.password)
					.then(result => {
						if (result) {
							const token = jwt.sign({ sub: user.id, role:user.role }, config.secret);
							const id = user._id;
							const role = user.role;

							return res.status(201).json({
								status: true,
								message: 'user logged in',
								token,
								id,
								role
							});
						}
						else {
							return res.status(201).json({
								status: false,
								message: 'failed to log in'
							});
						}

					})
			}
		})
		.catch(err => res.send(err));

}


module.exports.updatepassword = (req, res) => {
	const password = bcrypt.hashSync(req.body.password)
	console.log('paa',password);
	User.findByIdAndUpdate(req.params.id, { 'password': password })
		.then(user => res.status(200)
			.json({
				status: true,
				message:(user)
			}))
		.catch(err => res.send(err));
}



module.exports.comparepassword = (req, res) => {

	User.findById(req.params.id)
	
		.then(async (user) => {
			if (user) {
				const password = req.body.password;
				bcrypt.compare(password, user.password)
					.then(result => {
						if (result) {
					
							return res.status(200).json({
								status: true,
								message: 'password exist'
							});
						}
						else {
							return res.status(201).json({
								status: false,
								message: 'password does not exist'
							});
						}

					})
				
			}
			else {
				return res.status(201).json({
					status: false,
					message: 'id does not exist'
				});
			}
		})
		.catch(err => res.send(err));

}

module.exports.getRole=(req, res) =>{
    User.find({ $or: [
		{'role': 'admin'},
		{'role': 'disco'},
		{'role': 'maximpact'}
	  ]})
      .then(approvedApps => res.json(approvedApps))
      .catch(err => res.send(err));
  }


  