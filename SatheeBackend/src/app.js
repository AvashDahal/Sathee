import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';

const app = express();
const allowedOrigins = [process.env.CORS_ORIGIN, process.env.CLIENT_URL, process.env.FRONTEND_URL].filter(Boolean);
// CORS configuration
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
// Json Parser configuration
app.use(express.json({
    limit: "16kb"
}))

// URL encoding configuration
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))


// For Static files configuration
app.use(express.static("public"))

// Setting up cookie parser
app.use(cookieParser());



// importing Routes
import userRoutes from './routes/userRoute.js'
import authRoutes from './routes/authRoute.js'

// Setting the routes
app.use('/api/v1/users/',userRoutes);
app.use('/api/v1/auth/',authRoutes);

export { app }


