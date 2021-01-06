	const handleprofile = (req, res, knex) => {
	const { id } = req.params;
	knex('users')
	.where({
		id : id
	})
	.select('*')
	.then (user => {if(user.length){
		res.json(user[0])}
		else{
			res.json("No user record found");
		}})
	.catch(err => res.status(404).json(err))
}
module.exports = {
	handleprofile : handleprofile
}