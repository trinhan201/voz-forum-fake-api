import Comment from "../models/Comment.js";

export const createCommentController = async (req, res) => {
    try {
        const postId = req.body.postId;
        const newComment = new Comment({...req.body, userId: req.user.id, postId: postId});

        await newComment.save();
        res.status(200).json({ code: 200, message: 'Create comment successfully' });
    } catch (err) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
    }
};

export const updateCommentController = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if(!comment) return res.status(404).json({code: 404, message: 'Comment not found'});
        if(comment.userId !== req.user.id) return res.status(404).json({code: 403, message: 'Unauthorized'});
        const updateComment = await Comment.findByIdAndUpdate(req.params.id, {
            $set: {content: req.body.content}
        }, {new: true})

        res.status(200).json({code: 200, message: 'Successfully', updateComment});
    } catch (error) {
        res.status(400).json({code: 400, message: 'Unexpected error'});
    }
}

export const deleteCommentController = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if(!comment) return res.status(404).json({code: 404, message: 'Comment not found'});
        if(comment.userId !== req.user.id) return res.status(404).json({code: 403, message: 'Unauthorized'});
        await Comment.findByIdAndDelete(req.params.id);

        res.status(200).json({code: 200, message: 'Successfully'});
    } catch (error) {
        res.status(400).json({code: 400, message: 'Unexpected error'});
    }
}

export const getAllCommentController = async (req, res) => {
    try {
        const comments = await Comment.find({}).sort({createdAt: -1})
        res.status(200).json({code: 200, message: 'Successfully', data: comments});
    } catch (error) {
        res.status(400).json({code: 400, message: 'Unexpected error'});
    }
}

export const getCommentByIdController = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if(!comment) return res.status(404).json({code: 404, message: 'Comment not found'});

        res.status(200).json({code: 200, message: 'Successfully', data: comment});
    } catch (error) {
        res.status(400).json({code: 400, message: 'Unexpected error'});
    }
}