const handleregister = (req, res, bcrypt, knex) => {
	const {name, email, password} = req.body;
	if(!name || !email || !password){
		return res.status(400).json("Invalid form submission details");
	}
	const hash = bcrypt.hashSync(password, 8);
	knex.transaction(trx => {
		knex.insert({email: email, hash : hash})
    	.into('login')
    	.transacting(trx)
    	.returning ('email')
    	.then (emailSaved => {
    		return knex('users')
	    		.insert({
					name: name,
					email : emailSaved[0],
					joined : new Date()
				})
				.transacting(trx)
				.returning ('*')
    	})
    .then(trx.commit)
    .catch(trx.rollback);
	})
	.then (user => {
		res.json(user[0]);
	})
	.catch (err => res.json(err))
}

module.exports = {
	handleregister : handleregister
}