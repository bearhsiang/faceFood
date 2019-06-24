const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const UserSchema = new Schema({
	// _id: {
	// 	type: Schema.Types.ObjectId,
	// },
	name: {
		type: String,
		required: [true, 'name field is required.']
	},
	email: {
		type: String,
		required: [true, 'email field is required.']
	},
	figure: {
		type: Schema.Types.ObjectId,
		// required: [true, 'figure field is required.']
	},
	password: {
		type: String,
		required: [true, 'password field is required.']
	},
	wantlist: {
		type: [Schema.Types.ObjectId],
		default: []
	}
})

// Creating a table within database with the defined schema
const User = mongoose.model('user', UserSchema)

// Exporting table for querying and mutating
module.exports = User
