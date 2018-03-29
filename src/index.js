'use strict'
const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');

//server init
const server = restify.createServer({
  name : config.name,
  version: config.version
})

//settings

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.fullResponse())

// const users = {
//   1: {
//     name: 'Daniel'
//   },
//   2:{
//     name: 'Martin'
//   },
//   3:{
//     name: 'Guillermo'
//   },
//   4:{
//     name: 'Jaime'
//   }
// }
//ROUTES

// //index
// server.get('/', (req, res, callback)=>{
//   res.setHeader('Content-Type','application/json');
//   res.writeHead(200);
//   res.end(JSON.stringify(users));
// })
//
// //show
// server.get('/:id', (req, res, callback)=>{
//   res.setHeader('Content-Type','application/json');
//   res.writeHead(200);
//   console.log(req.params.id)
//   res.end(JSON.stringify(users[req.params.id]));
// })
//
// //create
// server.post('/', (req, res, callback)=>{
//
// })
//
// //update
// server.put('/:id', (req, res, callback)=>{
//
// })
//
// //delete
// server.del('/', (req, res, callback)=>{
//
// })

server.listen(config.port, () => {

	/**
	 * Connect to MongoDB via Mongoose
	 */
	const opts = {
    poolSize: 2,
    promiseLibrary: global.Promise
	}

	mongoose.Promise = opts.promiseLibrary
	mongoose.connect(config.db.uri, opts)

	const db = mongoose.connection

	db.on('error', (err) => {
	    if (err.message.code === 'E-TIMEDOUT') {
	        console.log(err)
	        mongoose.connect(config.db.uri, opts)
	    }
	})

	db.once('open', () => {

		require('./routes/user')(server)

		console.log(`Server is listening on port ${config.port}`)

	})

})
