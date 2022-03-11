import express from "express";
import bodyparser from "body-parser";
import cookieparser from "cookie-parser";
import { router as indexRouter } from "./controller/router.js";
import swaggerUI from "swagger-ui-express";
import cors from 'cors';
import { swaggerDocument } from './swagger/swagger.js';
import dotenv from "dotenv";
dotenv.config();
const app=express();
// app use
app.use(cors({
    origin: '*',
    methods:['GET', 'POST']
  }));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());
app.use(cookieparser());
app.use('/api', indexRouter);
app.listen((process.env.PORT || 5000), () => {
  console.log('Server started');
});