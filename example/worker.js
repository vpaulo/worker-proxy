self.onmessage = (event) => {
  const { id, method, args } = event.data;

  if (typeof self[method] === "function") {
    self[method](...args)
      .then((result) => {
        self.postMessage({ id, result });
      })
      .catch((error) => {
        self.postMessage({ id, error });
      });
  } else {
    self.postMessage({ id, error: "Method not found" });
  }
};

async function expensiveTask(duration) {
  await new Promise((resolve) => setTimeout(resolve, duration));
  return `Task completed after ${duration}ms`;
}

async function bigLoop() {
  let sum = 0;
  for (let i = 0; i < 100; i++) {
    sum += i;
  }
  return sum;
}

async function printHello() {
  console.log("worker hello!");
}
