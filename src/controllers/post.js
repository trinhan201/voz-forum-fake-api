import Post from "../models/Post.js";

export const createPostController = async (req, res) => {
    try {
        const newPost = new Post({...req.body, userId: req.user.id});

        await newPost.save();
        res.status(200).json({ code: 200, message: 'Create post successfully', data: newPost });
    } catch (err) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
    }
}

export const updatePostController = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post) return res.status(404).json({code: 404, message: 'Post not found'});
        if(post.userId !== req.user.id) return res.status(404).json({code: 403, message: 'Unauthorized'});
        const updatePost = await Post.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true})

        res.status(200).json({code: 200, message: 'Successfully', updatePost});
    } catch (error) {
        res.status(400).json({code: 400, message: 'Unexpected error'});
    }
}

export const deletePostController = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post) return res.status(404).json({code: 404, message: 'Post not found'});
        if(post.userId !== req.user.id) return res.status(404).json({code: 403, message: 'Unauthorized'});
        await Post.findByIdAndDelete(req.params.id);

        res.status(200).json({code: 200, message: 'Successfully'});
    } catch (error) {
        res.status(400).json({code: 400, message: 'Unexpected error'});
    }
}

export const uploadPostImgControler = async (req, res, next) => {
    const postId = req.body.postId;
    const files = req.files;
    
    if (!files) {
        const error = new Error('Please upload a file');
        error.httpStatusCode = 400;
        return next(error);
    }

    const fileUrls =  files.map(file => {
        return `https://voz-forum-fake-api.onrender.com/static/${file.filename}`;
    })

    await Post.findByIdAndUpdate(postId, { img: fileUrls });
    res.send('Successfully');
}

export const getAllPostController = async (req, res) => {
    try {
        const { limit } = req.query;
        const fullPosts = await Post.find({});
        const posts = await Post.find({}).sort({createdAt: -1}).limit(limit);
        const fullPostsLength = fullPosts.length;
        res.status(200).json({code: 200, message: 'Successfully', data: posts, length: fullPostsLength, fullPosts: fullPosts});
    } catch (error) {
        res.status(400).json({code: 400, message: 'Unexpected error'});
    }
}

export const getPostByIdController = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post) return res.status(404).json({code: 404, message: 'Post not found'});

        res.status(200).json({code: 200, message: 'Successfully', data: post});
    } catch (error) {
        res.status(400).json({code: 400, message: 'Unexpected error'});
    }
}