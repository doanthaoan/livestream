const express = require('express');
const app = express();
const fs = require('fs');
const child = require('child_process');
const { Worker, isMainThread, parentPort, workderData } = require('worker_threads');
const { rejects } = require('assert');

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

    // const streamRecord = (meetingId, streamId) => {
    //     if (meetingId === 0) return 1;
    //     return new Promise( async (resolve, reject) => {
    //         const numbers = [...new Array(meetingId)].map((_, i) => i + 1);

    //         // console.log(numbers);
    //         const segmentSize = 3;
    //         const segmentCount = Math.ceil(numbers.length / segmentSize);
    //         let segments = [];
    //         for (let i = 0; i < segmentCount; i++) {
    //             const start = i * segmentSize;
    //             const end = start + segmentSize;
    //             const segment = numbers.slice(start, end);
    //             segments.push(segment);
    //         }
    //         // console.log(segments);
    //         await segments.map(segment => {
    //             const worker = new Worker("./workder.js", {workerData: "abc"})
    //             worker.on('message', () => {console.log('running')});
    //             worker.on('error', () => {console.log('error')});
    //             worker.on('exit', (code) => {
    //                 if(code !== 0) console.log(`Worker stopped with ${code}`);
                
    //             })  
    //         }) 
                  
    //     })
    // }    
    // streamRecord(10, 0)
    // res.send(streamRecord(20));
    let streamSource = `${STREAM_PATH}${req.body.name}`; // build stream source based on paticipal ID
    streamSource = 'rtmp://192.168.110.52/live/bbb' // for test only
    fs.writeFile(`streamfile/stream-${req.body.name}.sh`, `ffmpeg -re -i ${streamSource} -vcodec copy -f flv rtmp://192.168.110.53/live/${req.body.name}`, {mode: 0o775}, function(err) {
        if(err) {
            console.log(err)
            // res.send(err);
            return res.send(err);
        } else {
            let streamFile = `streamfile/stream-${req.body.name}.sh`;
            console.log(`${streamFile} has been saved`);
            const subprocess = child.exec(streamFile);
            
            console.log(`${req.body.name} is recording by: `,subprocess);
            return res.send(subprocess);
        }
        
    // Save DB info

    // 
    })
}) 
// Delete video
app.post('/api/record/:id', (req, res) => {
    res.send(req.params.id);
    // delete file

    // delete shell file

    // delete DB (archive)

    // permanent delete from DB
})
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening to port ${port}...`));
