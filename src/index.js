import dotenv from 'dotenv';
import connectToDatabase from './config/database.js';
import app from './app.js';
dotenv.config({
    path: './.env'
}); // Load environment variables from .env file

const startServer = async () => {
    try {
       await connectToDatabase(); // Connect to the database 
       app.on("error", (error) => {
            console.log("ERROR", error);
            throw error;
        });

        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running on port ${process.env.PORT || 8000}`);
        })
    } catch (error) {
        console.error("Error starting server:", error);
    }
}


startServer();