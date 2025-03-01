const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config({ path:'./.env' });

// Setting up MySQL connection
const db = mysql.createConnection ({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DATABASE_PORT
});

// Connect to MySQL
db.connect((error) => {
    if (error) {
        console.log('Error connecting to the database', error);
        return;
    } else {
        console.log('MySQL connected successfully');
    }
})

module.exports = db;