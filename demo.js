const express = require('express');

const app=express();

let visitcount=0

app.use((req,res,next)=>{
    visitcount=visitcount+1;
    console.log(visitcount);
    next()
})

app.get("/",(req,res)=>{
    res.send(`total count is:${visitcount}`)
})

app.listen(3000,console.log("server has started")
)