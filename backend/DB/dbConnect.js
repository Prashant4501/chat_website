import mongoose from 'mongoose';

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECT);
        console.log("Database Connected successfully");
    } catch (error) {
        console.error("Error connecting to database", error);
    }
};

// Exporting dbConnect as default
export default dbConnect;
