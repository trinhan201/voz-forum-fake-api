import User from "../models/User.js";
import bcrypt from 'bcryptjs';

export const updateUserController = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if(!user) return res.status(404).json({code: 404, message: 'User not found'});
        const updateUser = await User.findByIdAndUpdate(req.user.id, {
            $set: req.body
        }, {new: true})

        res.status(200).json({code: 200, message: 'Successfully', updateUser});
    } catch (error) {
        res.status(400).json({code: 400, message: 'Unexpected error'});
    }
}

export const deleteUserController = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if(!user) return res.status(404).json({code: 404, message: 'User not found'});
        await User.findByIdAndDelete(req.user.id)

        res.status(200).json({code: 200, message: 'Successfully'});
    } catch (error) {
        res.status(400).json({code: 400, message: 'Unexpected error'});
    }
}

export const getAllUserController = async (req, res) => {
    try {
        const { limit } = req.query;
        const fullUsers = await User.find({}).sort({createdAt: -1});
        const users = await User.find({}).sort({createdAt: -1}).limit(limit);
        const fullUsersLength = fullUsers.length;
        res.status(200).json({code: 200, message: 'Successfully', data: users, length: fullUsersLength, fullUsers: fullUsers});
    } catch (error) {
        res.status(400).json({code: 400, message: 'Unexpected error'});
    }
}

export const getUserByIdController = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user) return res.status(404).json({code: 404, message: 'User not found'});

        res.status(200).json({code: 200, message: 'Successfully', data: user});
    } catch (error) {
        res.status(400).json({code: 400, message: 'Unexpected error'});
    }
}

export const changeAvatarControler = async (req, res, next) => {
    const userId = req.body.userId;
    const file = req.file;
    const fileUrl = `https://voz-forum-fake-api.onrender.com/static/${file.filename}`;
    if (!file) {
        const error = new Error('Please upload a file');
        error.httpStatusCode = 400;
        return next(error);
    }

    await User.findByIdAndUpdate({ _id: userId }, { avatar: fileUrl });
    res.send('Successfully');
};

export const changePasswordController = async (req, res) => {
    try {
        const currentUser = await User.findById(req.user.id);
        const oldPassword = req.body.oldPassword;
        const salt = bcrypt.genSaltSync(10);
        const newPassword = bcrypt.hashSync(req.body.newPassword, salt);
        const isCorrect = await bcrypt.compare(oldPassword, currentUser.password);
        const isConflict = await bcrypt.compare(req.body.newPassword, currentUser.password);

        if (!isCorrect) {
            res.status(400).json({
                code: 400,
                message: 'Old password is wrong and please try again',
            });
        } else {
            if (!isConflict) {
                await User.findByIdAndUpdate(req.user.id, { password: newPassword }, { new: true });
                res.status(200).json({
                    code: 200,
                    message: 'Change password successfully',
                });
            } else {
                res.status(400).json({
                    code: 400,
                    message: 'Password conflict',
                });
            }
        }
    } catch (error) {
        res.status(400).json({code: 400, message: 'Unexpected error'});
    }
}