import { Post } from "../models/post.model.js";

const createPost = async (req, res) => {
    try {
        const { name, description, age } = req.body;
        
        // validate the input
        if (!name || !description || !age) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // create a new post
        const post = new Post ({
            name,
            description,
            age,
        });

        // save the post to the database
        await post.save();

        // return the created post and a success message
        res.status(201).json({ message: "Post created successfully", post });   
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
        
    }
}

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();

        // check if there qre any posts
        if (posts.length === 0) {
            return res.status(404).json({
                message: "No posts found",
            });
        }
        // return the posts
        res.status(200).json({
            message: "Posts retrieved successfully", 
            posts,
        })
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, age } = req.body;

        // validate the input
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "At least one field is required to update" });
        }

        // check if the post exists with the given id
        const existingPost = await Post.findById(id);
        if (!existingPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        // find the post by id and update it
        const post = await Post.findByIdAndUpdate(id, { name, description, age }, { new: true});
        res.status(200).json({ message: "Post updated successfully", post });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const deletePost = async (req, res) => {
    try {

        const { id } = req.params;

        // check if the post exists 
        const existingPost = await Post.findById(id);
        if (!existingPost) {
            return res.status(404).json({ message: "Post not found" });
        }
        // find the post by id and delete it 
        const deletedPost = await Post.findByIdAndDelete(id);
        res.status(200).json({ message: "Post deleted successfully", post: deletedPost });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export { createPost, getPosts, updatePost, deletePost };