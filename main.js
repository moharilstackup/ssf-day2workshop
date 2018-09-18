//Step 1: load path and express
const express = require("express");
const path = require("path");

//Step 2: create an instance of the application
const app = express();

//Step 3: define routes

//Serves from public
app.use(express.static(path.join(__dirname, "public")));
/* app.use((req,res) => {
    //Redirect the request to the file not found page
    //Also in public directory
    res.redirect("/");
 }); */

//Step 4: start the server
const PORT = parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000;

app.listen(PORT, () => {
    console.info(`Application started on port ${PORT} at ${new Date()}`);
}
);