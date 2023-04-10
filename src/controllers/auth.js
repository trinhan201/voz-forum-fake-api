import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const generateAccessToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.ACCESS_SECRET, {
        expiresIn: '1w',
    });
};

export const signUpController = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password: hash });

        await newUser.save();
        res.status(200).json({ code: 200, message: 'Sign up successfully' });
    } catch (err) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
    }
}

export const signInController = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ code: 404, message: 'User not found!' });

        const isCorrect = await bcrypt.compare(req.body.password, user.password);

        if (!isCorrect) return res.status(400).json({ code: 400, message: 'Wrong Credentials!' });

        const accessToken = generateAccessToken(user);

        res.status(200).json({ code: 200, message: 'Sign in successfully', accessToken: accessToken });
    } catch (err) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
    }
}

export const getCurrentUserController = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({code: 200, data: user});
    } catch (error) {
        res.status(400).json({code: 400, message: 'Unexpected error'});
    }
}