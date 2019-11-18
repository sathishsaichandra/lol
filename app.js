const express=require('express');
const app=express();
const apiRouter=require('./routes/index');
const bodyParser=require('body-parser');
const swaggerDocument=require('./swagger/swagger');
const swagger=require('swagger-ui-express');
app.use('/swagger',swagger.serve,swagger.setup(swaggerDocument));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/app',apiRouter);


app.listen(3000,()=>{
    console.log("server is running");
})
