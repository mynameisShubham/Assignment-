const express =require('express');
const connectDB=require('./db/conn');
const routes=require('./Routes/routes');
const app=express();
const port=process.env.PORT||9000;

connectDB()

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/api/',routes);


app.listen(port,()=>{
    console.log(`Server Listening on http://localhost:${port}`);
})
