const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const User = require('../models/User');

const secretKey = process.env.JWT_SECRET;

const signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: {
                email: email,
            }
        });

        if (user) {
            return res.status(200).json({ message: 'User Already exist', status: 200 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            email: email,
            password: hashedPassword
        });

        res.status(201).json({ message: 'Signup successful' });
    }catch (error){
        console.error(error);
        res.status(500).json({ message: 'Server error'});
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: {
                email: email,
            },
            attributes: ["email", "password", "id"]
        });

        if (!user) {
            return res.status(401).json({ message: 'Authorization Failed', status: 401 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Authorization Failed', status: 401 });
        }

        const token = jwt.sign({ email: email }, secretKey, { expiresIn: "3h" });

        return res.status(200).json({ message: "Login successful", token: token, status: 200 });

    }catch (error){
        console.error(error);
        res.status(500).json({ message: 'Server error'});
    }
}

module.exports = {
    login,
    signup
}