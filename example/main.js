import { WorkerProxy } from "../worker-proxy.js";

const worker = new Worker("worker.js");
const rpcProxy = WorkerProxy(worker);

rpcProxy
  .expensiveTask(2000)
  .then((result) => {
    console.log("Result:", result);
  })
  .catch((error) => {
    console.log("Error:", error);
  });

rpcProxy
  .bigLoop()
  .then((result) => {
    console.log("Result bigLoop:", result);
  })
  .catch((error) => {
    console.log("Error bigLoop:", error);
  });

console.log(">>> await bigloop", await rpcProxy.bigLoop());
console.log(">>> hello", await rpcProxy.printHello());
