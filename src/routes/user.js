const User = require('../models/users')

module.exports = function(server) {
  server.post('/users', (req, res, next) => {

		let data = req.body || {}

		User.create(data)
			.then(task => {
				res.send(200, task)
				next()
			})
			.catch(err => {
				res.send(500, err)
			})

	})

  server.get('/users', (req, res, next) => {

		let limit = parseInt(req.query.limit, 10) || 10, // default limit to 10 docs
        skip  = parseInt(req.query.skip, 10) || 0, // default skip to 0 docs
        query = req.query || {}

        // remove skip and limit from query to avoid false querying
    delete query.skip
    delete query.limit

    User.find(query).skip(skip).limit(limit)
		  .then(users => {
				res.send(200, users)
				next()
			})
			.catch(err => {
				res.send(500, err)
			})
	})

  server.get('/users/:id', (req, res, next) => {

		User.findById(req.params.id)
		.then(user => {
			res.send(200, user)
			next()
		})
		.catch(err => {
			res.send(500, err)
		})
	})

  server.put('/users/:id', (req, res, next) => {
		let data = req.body || {},
			opts = {
        new: true
			}

		User.findByIdAndUpdate({ _id: req.params.id }, data, opts)
		.then(user => {
			res.send(200, user)
			next()
		})
		.catch(err => {
			res.send(500, err)
		})
	})

  server.del('/users/:id', (req, res, next) => {
		const id = req.params.id

		User.findOneAndRemove({ _id: id })
			.then(() => {
        console.log("success")
        res.send(204,console.log("success"))
        next()
			})
			.catch(err => {
				res.send(500, err)
			})

	})
}
