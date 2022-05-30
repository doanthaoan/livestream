const express = require('express');
const app = express();
const fs = require('fs');
const child = require('child_process');

const STREAM_PATH = "rtmp://192.168.224.183:41050/";

app.use(express.json())

// List videos
app.get('/api/record', (req, res) => {
    res.send("Hello world");
})
// get video 
app.get('/api/record/:id', (req, res) => {
    // res.send(req.param.id);
})
// Record
app.post('/api/record', (req, res) => {
    

    let streamSource = `${STREAM_PATH}${req.body.name}`; // build stream source based on paticipal ID
    streamSource = 'rtmp://192.168.110.52/live/bbb' // for test only
    fs.writeFile(`streamfile/stream-${req.body.name}.sh`, `ffmpeg -re -i ${streamSource} -vcodec copy -f flv rtmp://192.168.110.53/live/${req.body.name}`, {mode: 0o775}, function(err) {
        if(err) {
            console.log(err)
            // res.send(err);
        } else {
            let streamFile = `streamfile/stream-${req.body.name}.sh`;
            console.log(`${streamFile} has been saved`);
            child.exec(streamFile);
            return res.send({'name': streamFile});
        }
        
    // Save DB info

    // 
    })
}) 
// Delete video
app.post('/api/record/:id', (req, res) => {
    res.send(req.param.id);
    // delete file

    // delete shell file

    // delete DB (archive)

    // permanent delete from DB
})
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening to port ${port}...`));
