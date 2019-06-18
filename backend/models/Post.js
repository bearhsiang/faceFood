const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const postSchema = new Schema({
	// _id: {
	// 	type: String,
	// 	required: [true, 'id field is required.']
	// },
	name: {
		type: String,
		default: 'Food'
	},
	date: {
		type: Date,
		default: Date.now
	},
	text: {
		type: String,
		default: 'not comment'
	},
	location: {
		type: String,
		default: 'Somewhere'
	},
	photolist: {
		type: [Schema.Types.ObjectId],
		// required: [true, 'photolist field is required.']
	},
	rate: {
		type: Number,
		default: 3.0
	}
})

// Creating a table within database with the defined schema
const Post = mongoose.model('post', postSchema)

// Exporting table for querying and mutating
module.exports = Post