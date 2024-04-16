// Require necessary modules
const userTeacher = require("../model/userModel"); // Import your User model

// Middleware for user authentication
exports.authentication = (req, res, next) => {
    if (req.session.mail) {
        next(); // Proceed to the next middleware
    } else {
        res.render('login', { user: "" }); // Render home page if user is not authenticated
    }
}

// Rendering home page
exports.getHome = (req, res) => {
    res.render("login");
}

// Rendering dashboard page
exports.getDashboard = (req, res) => {
    res.render("dashboard");
}

// Rendering register form
exports.getRegister = (req, res) => {
    res.render("registration");
}

// Handling user signup
exports.postRegister = async (req, res) => {

    try {
        // Check if the username already exists
        const existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) {
            return res.status(400).json({ error: "Username already exists" });
        }

        // Create the user in the database
        const user = await User.create({
            fullname: req.body.fullname,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
          });
          
          return res.status(200).json(user);
    } catch (error) {
        // Handle any errors (e.g., duplicate username or email)
        return res.status(400).json({ message: error.message });
    }
}

// Rendering login form
exports.getLogin = (req, res) => {
    res.render("login");
}

// Handling user login
exports.postLogin = async (req, res) => {
    try {
        // Check if the user exists
        const user = await User.findOne({ username: req.body.username });
        if (user) {
            // Compare passwords (consider using bcrypt for password hashing)
            if (req.body.password === user.password) {
                // Successful login
                req.session.user = user; // Store user data in session (if using sessions)
                return res.status(200).json({ message: "Login successful", user });
            } else {
                return res.status(400).json({ error: "Incorrect password" });
            }
        } else {
            return res.status(400).json({ error: "User not found" });
        }
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}


// Handling user logout
exports.logout = (req, res) => {
    req.session.destroy(); // Destroy session
    res.render("login");
}
