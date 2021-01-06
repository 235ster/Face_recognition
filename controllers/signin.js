const handlesignin = (req, res, bcrypt, knex) => {
const {email, password} = req.body;
	knex('login')
	.where({ email: email })
	.select('hash')
	.then (data => {
		if(bcrypt.compareSync(password, data[0].hash)) {
			knex('users')
			.where({
				email : email
			})
			.select('*')
			.then (user => {
				if(user.length){
					res.json(user[0])
				}
				else{
				res.json("No user record found");
				}
			})
			.catch(err => res.status(404).json(err))
		}else{
			res.json("No user found");
		} 
	})
	.catch (err => res.json(err));
}

module.exports ={
	handlesignin : handlesignin
}