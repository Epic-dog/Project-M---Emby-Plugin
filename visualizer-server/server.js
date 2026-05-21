const express=require('express');
const app=express();
app.get('/',(req,res)=>res.send('projectM server running'));
app.listen(8080,()=>console.log('running'));
