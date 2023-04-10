import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PostSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
            trim: true,
        },
        title: {
            type: String,
        },
        content: {
            type: String,
        },
        img: {
            type: Array,
        }
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Post', PostSchema);
