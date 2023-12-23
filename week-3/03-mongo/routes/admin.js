const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();

// Admin Signup Route
app.post('/signup', (req, res) => {
    // Implement admin signup logic
    Admin.create({
        username: req.body.username,
        password: req.body.password
    });

    req.send({
        message: 'Admin created successfully' 
    });
});

// Course Creation Route
app.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    const { title, description, image, price } = req.body;
    
    Course.create({
        title: title,
        description: description,
        image: image,
        price: price
    });

    req.send({
        message: 'Course created successfully'
    });
});

// Fetching All Courses Route
app.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
    Course.find()
        .then(courses => {
            res.send(courses);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

module.exports = router;
