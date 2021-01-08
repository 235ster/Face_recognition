const Clarifai = require ('clarifai');

const app = new Clarifai.App({
 apiKey: process.env.API_KEY
});

const handleFaceDetect = (req, res) => {
	app.models.predict('d02b4508df58432fbb84e800597b8959', req.body.searchInput)
    .then(response => {
    	res.json(response)})	
}

const handleimage = (req,res, knex) => { const { id }= req.body;
	knex('users')
	.where({ id : id })
	.increment('enteries', 1)
	.returning('enteries')
	.then (enteries => res.json(enteries))
	.catch(err => res.status(404).json("Unable to get enteries"))
}

module.exports ={
	handleimage : handleimage,
	handleFaceDetect : handleFaceDetect
}