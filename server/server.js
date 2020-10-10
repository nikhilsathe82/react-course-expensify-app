//to setup express as production web server
const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname,'..','public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

//we can make a function to work when someone makes a get request to server. to match all unhandled requests or routes
//processing all unhandled requests. send back the index.html files in public dir. req > contains info about requests. res>lets you manipulate the response to us exp server makes whoever made the https req. 
app.get('*',(req,res) =>{
     res.sendFile(path.join(publicPath,'index.html'));
});

//3000 is port number
app.listen(3000,() => {
    console.log('Server is Up!');
});