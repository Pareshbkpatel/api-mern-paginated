import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
