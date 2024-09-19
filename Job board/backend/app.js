import cookieParser from 'cookie-parser';
config();
import express from 'express'
import { config } from 'dotenv';
import morgan from 'morgan';
import errorMiddleware from './middlewares/error.middleware.js'
import cors from 'cors'
// import multer from 'multer';
// const upload = multer();

const app = express();
// app.use(upload.none());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(cors({
    origin: [process.env.FRONTEND_URI],
    Credential: true,
}));

app.use(cookieParser());

app.use('/ping', function(req, res){
    res.send('Pong')
});

// Import all routes
import userRoutes from './routes/user.routes.js';
import jobRoutes from './routes/postJob.routes.js';
import companyRoutes from './routes/company.routes.js'


app.use('/api/v1/user', userRoutes);
app.use('/api/v1/job', jobRoutes);
app.use('/api/v1/company', companyRoutes);

app.all('*', (_req, res) => {
    res.status(404).send('OOPS!!! 404 Page Not Found');
  });

// Custom error handling middleware
app.use(errorMiddleware);

export default app;