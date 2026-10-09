const { readDatabase, writeDatabase } = require("../database");
const bcrypt = require("bcrypt");

// Register User
async function registerUser(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const database = readDatabase();

        const existingUser = database.users.find(
            user => user.email === email
        );

        if (existingUser) {
            return res.status(400).json({
                message: "Email already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            id: Date.now(),
            name: name,
            email: email,
            password: hashedPassword,
            role: "student"
        };

        database.users.push(newUser);

        writeDatabase(database);

        res.status(201).json({
            message: "Registration successful"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error"
        });
    }
}


// Login User
async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        const database = readDatabase();

        const user = database.users.find(
            user => user.email === email
        );

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        res.json({
            message: "Login successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
}


module.exports = {
    registerUser,
    loginUser
};