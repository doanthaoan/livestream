const express = require('express');
const app = express();
const fs = require('fs');
const child = require('child_process');
const { Z_FIXED } = require('zlib');

app.use(express.json())
app.post('/api/record', (req, res) => {
    // res.send(req.body);
    fs.writeFile(`streamfile/stream-${req.body.name}.sh`, `ffmpeg -re -i rtmp://192.168.110.52/live/bbb -vcodec copy -f flv rtmp://192.168.110.53/live/${req.body.name}`, {mode: 0o775}, function(err) {
        if(err) {
            console.log(err)
            res.send(err);
        } else {
            let streamFile = `streamfile/stream-${req.body.name}.sh`;
            console.log(`${streamFile} has been saved`)
            res.send({'name': streamFile});
            child.exec(streamFile);
        }
        
        

    })
}) 
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening to port ${port}...`));
