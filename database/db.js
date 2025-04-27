const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {})
.then(() => console.log('Połączono z bazą MongoDB'))
.catch((err) => console.error('Błąd połączenia z MongoDB:', err));

module.exports = mongoose;