import express from 'express';

const app = express(); // Create an instance of the Express application

// Middleware to parse JSON bodies
app.use(express.json()); 

// routes import
import userRoutes from './routes/user.route.js';
import postRoutes from './routes/post.route.js';

// routes declaration
app.use('/api/v1/users', userRoutes); // Use the user routes under the '/api/v1/users' path
app.use('/api/v1/posts', postRoutes); // Use the post routes under the '/api/v1/posts' path

export default app;