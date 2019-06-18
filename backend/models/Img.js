const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const imgSchema = new Schema({
	// _id:{
	// 	type: Schema.Types.ObjectId,
	// },
	// owner:{
	// 	type: Schema.Types.ObjectId,
	// 	required: [true, 'owner id required']
	// },
	buffer: {
		type: String,
		// required: [true, 'buffer field is required.']
	},
})

// Creating a table within database with the defined schema
const Img = mongoose.model('img', imgSchema)

// Exporting table for querying and mutating
module.exports = Img