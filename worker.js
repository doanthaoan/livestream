const { Worker, parentPort, workerData } = require('worker_threads');
const data = workerData;
console.log("Worker");
parentPort.postMessage(workderData);