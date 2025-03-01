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