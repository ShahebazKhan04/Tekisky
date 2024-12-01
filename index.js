import express from 'express';
import dotenv from 'dotenv';
import connectDb from './db/connectDb.js'
import studentRoute from './routes/studentRoutes.js';
import staffRoute from './routes/staffRoutes.js';
import batchRoute from './routes/batchRoutes.js';
dotenv.config()
connectDb()
const app = express();
app.use(express.json())

app.use('/student', studentRoute)
app.use('/staff', staffRoute)
app.use('/batches', batchRoute)

app.listen(process.env.PORT, () => {
    console.log(`server strtted at port number ${process.env.PORT}`)
})