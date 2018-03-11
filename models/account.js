const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
	name:  {
		type: String,
		required: true,
		minlength: [2, 'name must be at least 2 characters.'],
		trim: true
	},
	balance: { type: Number, default: 0.0 }
});

// Export model
module.exports = mongoose.model('Account', accountSchema);
