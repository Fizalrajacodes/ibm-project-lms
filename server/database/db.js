import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

export const connectDb = async() => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/lms", {
            dbName: 'lms',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connection successful');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Terminate the application with an error code (1)
    }
};