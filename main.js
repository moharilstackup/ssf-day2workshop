//Load libs
const path = require('path');
const express = require('express');

const resources = [ 'images', 'public' ];
// const images = [ 'bear.jpg', 'cat.jpg', 'dog.jpg','th8.png','th9.png','th10.png', 'th11.png','th12.png' ];
const images = [ 'th7.png','th8.png','th9.png','th10.png', 'th11.png','th12.png' ]

const randImage = (array) => {
    const rand = Math.random();
    const index = Math.floor(rand * array.length)
    return (array[index]);
}

//Create an instance of Express
const app = express();

//Define our routes
// GET /image -> text/html
app.get('/image', (req, resp) => {
    resp.status(200);
    const imageFile = randImage(images);
    resp.format({
        'text/html': () => {
            resp.send(`<img src='/${randImage(images)}' width="200" height="200">`);
        },
        'image/png': () => {
            resp.sendfile(path.join(__dirname, 'images', imageFile));
        },
        'application/json': () => {     
            resp.json({filename: imageFile});
        },
        'default': () => {
            resp.status(406);
            resp.send('Not Acceptable');
        }
    });
});

// -------------- to be commented
/* app.get('/image', (req, resp) => {
    resp.status(200);
    resp.type('text/html');
    resp.send(`<img src='/${randImage(images)}'>`);
});

//GET /random-image -> image/png
app.get('/random-image', (req, resp) => {
    const imageFile = randImage(images);
    resp.status(200);
    resp.type('image/png');
    resp.sendfile(path.join(__dirname, 'images', imageFile));
}); */
// -------------- to be commented

for (let res of resources) {
    console.info(`Adding ${res} to static`)
    app.use(express.static(path.join(__dirname, res)));
}

//Start the Express application
const PORT = parseInt(process.argv[2]) || 
        parseInt(process.env.APP_PORT) || 3000;

app.listen(PORT, () => {
    console.info(`Application started on port ${PORT}`);
});