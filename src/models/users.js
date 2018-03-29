const mongoose   = require('mongoose'),
      timestamps = require('mongoose-timestamp')

const UserSchema = new mongoose.Schema({
	email: String,
  name: String,
  last: String,
  role: String
}, { collection: 'users' })

UserSchema.plugin(timestamps)

module.exports = exports = mongoose.model('User', UserSchema)
