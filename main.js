//Step 1: load path and express
const express = require("express");
const path = require("path");
const fs = require('fs');

//Step 2: create an instance of the application
const app = express();
const imageDir = path.resolve(__dirname, 'images/')



//Step 3: define routes
app.get('/image', (req, resp) => {
    //status
    resp.status(203);
    resp.type('text/html');
    // resp.sendfile("images/cat.jpg");
    var myPixList = new Array("cat.jpg", "dog.jpg", "bear.jpg");
    var randomNum = (Math.floor(Math.random() * (myPixList.length) ));
    var myRanPix=myPixList[randomNum];
    // const catImg="cat.jpg";
     resp.send(`<h1>hello ${randomNum}</h1><img src=${myPixList[randomNum]} height="300" width="300">"`);
    // resp.send(`<h1>hello ${randomNum}</h1>"`);
    // console.log(`Response type, ${resp.status}`);
});

//Serves from public
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "images")));
/* app.use((req,res) => {
    //Redirect the request to the file not found page
    //Also in public directory
    res.redirect("/");
 }); */




//Step 4: start the server
const PORT = parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000;

app.listen(PORT, () => {
    console.info(`Application started on port ${PORT} at ${new Date()}`);
    console.info(`Image directory : ${imageDir}`);
}
);