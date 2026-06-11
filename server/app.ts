import  express from "express";
import apiRouter from './routes/index.js'
// import cors from 'cors'
const app = express();

// app.use(
//     cors({}

//     )
// )
app.use(express.json())
app.get('/',(_req, res)=>{
    res.json({ name: 'aris-ecommerce-api', version: '1.0.0'})
})

app.use('/api', apiRouter)
export default   app;
