import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Comment content cannot be empty'],
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: [true, 'Comment must be associated with a project']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Comment must have an author']
    }
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
