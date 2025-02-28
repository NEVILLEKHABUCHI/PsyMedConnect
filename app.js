const express = require('express');
const app = express()


// Import routes
const clientRoutes = require('./routes/clientRoutes');

// Setting the view engine to EJS
app.set('view engine', 'ejs');

// static files (CSS, images)
app.use(express.static('public'));

// Use routes
app.use('/', clientRoutes);

// Start the server
app.listen(3000, () => {
    console.log(`Server is running on http://localhost: {3000}`);
})