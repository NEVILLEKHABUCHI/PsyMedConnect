const db = require('../models/mysql');
const dotenv = require('dotenv');
dotenv.config({path:'./.env'});

exports.getHome = (req, res) => {
    res.render('home', {title: 'Home'});
}

exports.getAbout = (req, res) => {
    res.render('about', {title: 'About'});
}

exports.getContacts = (req, res) => {
    res.render('contact', {title: 'Contact Us'});
}

exports.getSubmitDetails = (req, res) => {
    res.render('submitDetails', {title: 'Submit Details'});
}

exports.addDetails = (req, res) => {
    const { firstName, lastName, phoneNumber, emailAddress, regNo, faculty, course, year } = req.body;
    const ADMIN_USERNAME = process.env.ADMIN_USERNAME;

    const query = `SELECT * FROM USERS WHERE FIRST_NAME = ?`;

    // Checking whether all required fields are filled
    if (!firstName || !lastName || !phoneNumber || !emailAddress || !regNo || !faculty || !course || !year) {
        console.log("Fill in all the details");
        req.flash("error", "Fill in all the details");
        return res.status(400).redirect("/submitDetails");
    }

    // Admin check (should be outside the missing field check)
    if (firstName === ADMIN_USERNAME) {
        db.query(query, [ADMIN_USERNAME], (err, results) => {
            if (err) {
                console.error("Database error:", err);
                req.flash("error", "An error occurred while submitting details!");
                return res.status(500).redirect("/submitDetails");
            }

            if (results.length > 0) {
                const user = results[0];

                if (emailAddress === user.EMAIL_ADDRESS) {  // Ensure correct column name
                    console.log("You are logging in as an admin");
                    return res.status(200).send("Admin login detected");
                }
            }

            console.log("Fill in all the details");
            req.flash("error", "Fill in all the details");
            return res.status(400).redirect("/submitDetails");
        });

        return; // Prevent further execution
    }

    const query1 = `SELECT * FROM USERS WHERE REG_NO = ?`;
    const query2 = `INSERT INTO USERS (REG_NO, FIRST_NAME, LAST_NAME, PHONE_NUMBER, EMAIL_ADDRESS, FACULTY, COURSE, YEAR_OF_STUDY) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`;

    // Checking whether the user with the same REG_NO already exists
    db.query(query1, [regNo], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            req.flash("error", "An error occurred while submitting details");
            return res.status(500).redirect("/submitDetails");
        }

        if (results.length > 0) {
            console.log("User already exists");
            req.flash("error", "Details already submitted");
            return res.status(400).redirect("/submitDetails");
        }

        // Insert user into database
        db.query(query2, [regNo, firstName, lastName, phoneNumber, emailAddress, faculty, course, year], (err) => {
            if (err) {
                console.error("Error inserting user details in the database:", err);
                req.flash("error", "An error occurred while sending details");
                return res.status(500).redirect("/submitDetails");
            }
            req.flash("success", "Details submitted successfully");
            return res.status(200).redirect("/");
        });
    });
};
