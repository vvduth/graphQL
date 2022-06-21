import express from "express";
import dotenv from 'dotenv';
import { Color } from "colors";
import {connectDB} from './config/db'
import {graphqlHTTP} from 'express-graphql'
import schema from './schema/schema';
dotenv.config() ; 
const port = process.env.PORT || 5000 ; 


const app = express() ;
connectDB();

app.use('/graphql', graphqlHTTP({
    schema, 
    graphiql: process.env.NODE_ENV === 'development'
}))

app.listen(port, () => {
   console.log( `Server running on port ${port}`)
})
