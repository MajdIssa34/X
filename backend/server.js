import express from "express";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import notficationRoutes from "./routes/notification.route.js";
import cors from "cors"; // Keep this import (ES Modules)

import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import connectMongoDB from "./db/connectMongoDB.js";
import cookieParser from "cookie-parser";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Configure CORS
const allowedOrigins = [
    "http://localhost:49167", // Add your Flutter app's origin
    "http://localhost:58335",
    "http://localhost:62461",
    "http://localhost:63463",
    "http://localhost:50399"
];

app.use(
    cors({
        origin: function (origin, callback) {
            // Check if the origin is in the allowedOrigins list
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, origin);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true, // Allow cookies
    })
);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notficationRoutes);

app.listen(8000, () => {
    console.log("Server is running on port", PORT);
    connectMongoDB();
});
