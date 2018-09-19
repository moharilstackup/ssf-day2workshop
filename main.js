//Load libs
const path = require('path');
const express = require('express');
const asciify = require('asciify-image');

var options = {
    fit: 'box',
    width: 100,
    height: 50
}


const resources = ['images', 'public'];
// const images = [ 'bear.jpg', 'cat.jpg', 'dog.jpg','th8.png','th9.png','th10.png', 'th11.png','th12.png' ];
const images = ['th7.png', 'th8.png', 'th9.png', 'th10.png', 'th11.png', 'th12.png']

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
            resp.json({ filename: imageFile });
        },
        'text/plain': () => {
            asciify(path.join(__dirname, 'images', imageFile), options)
                .then(function (asciified) {
                    // Print asciified image to console
                    console.log(asciified);
                    resp.send(asciified);
                })
                .catch(function (err) {
                    // Print error to console
                    console.error(err);
                });
            // resp.send("Test");
        },
        'default': () => {
            resp.status(406);
            resp.send('Not Acceptable');
        }
    });
});

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