import cookieParser from 'cookie-parser';
config();
import express from 'express'
import { config } from 'dotenv';
import cors from 'cors'

const app = express();


app.use(express.json());

app.use(cors({
    origin: [process.env.FRONTEND_URI],
    Credential: true,
}));

app.use(cookieParser());

app.use('/ping', function(req, res){
    res.send('Pong')
});

app.all('*', (_req, res) => {
    res.status(404).send('OOPS!!! 404 Page Not Found');
  });

export default app;