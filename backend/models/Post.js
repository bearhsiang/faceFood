const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const postSchema = new Schema({
	// _id: {
	// 	type: String,
	// 	required: [true, 'id field is required.']
	// },
	author: {
		type: Schema.Types.ObjectId,
	},
	name: {
		type: String,
		default: 'Food'
	},
	y:{
		type: Number,
		required: [true, 'y is required']
	},
	m:{
		type: Number,
		required: [true, 'm is required']
	},
	d:{
		type: Number,
		required: [true, 'd is required']
	},
	text: {
		type: String,
		default: 'not comment'
	},
	location: {
		type: String,
		default: 'Somewhere'
	},
	photo: {
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