import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js'
import formRouter from './routes/form.route.js'
import cookieParser from 'cookie-parser';
import logger from '../logger.js';

dotenv.config();

mongoose
  .connect(process.env.MONGODB)
  .catch((err) => {
    logger.error(err);
    console.log(err)
  });

const app = express();

app.use(express.json())
app.use(cookieParser())

try{
  app.listen(3000);
}
catch(err){
  console.log(err)
  logger.error(err)
}

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/form', formRouter)

app.use((err, req, res, next) =>{
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
      "success": false,
      statusCode,
      message
    })
});