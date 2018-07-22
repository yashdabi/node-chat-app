const path = require('path');
const express = require('express');

const app = express();
const pathJoin = path.join(__dirname, './../public');
const port = process.env.PORT || 3000;
app.use(express.static(pathJoin));


app.listen(port, ()=>{
    console.log('server is up on 3000');
})
