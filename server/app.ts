import  express from "express";
import apiRouter from './src/routes/index.js'
// import cors from 'cors'
const app = express();

// app.use(
//     cors({}

//     )
// )

app.get('/',(_req, res)=>{
    res.json({ name: 'aris-ecommerce-api', version: '1.0.0'})
})

app.use('/api', apiRouter)
export default   app;
