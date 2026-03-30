import { Router}  from 'express';
import { createPost, getPosts, updatePost, deletePost } from '../controllers/post.controller.js';
const router = Router();

router.post('/create-posts', createPost);
router.get('/get-posts', getPosts);
router.patch('/update-posts/:id', updatePost)
router.delete('/delete-posts/:id', deletePost);
export default router;