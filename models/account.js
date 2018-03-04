const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
	name: String,
	balance: { type: Number, default: 0.0 }
});

// Export model
module.exports = mongoose.model('Account', accountSchema);
