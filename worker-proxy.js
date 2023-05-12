// IDEA FROM: https://soshace.com/mastering-javascript-proxies-practical-use-cases-and-real-world-applications/
export function WorkerProxy(worker) {
  const messages = new Map();

  const handler = {
    get(_, method) {
      return (...args) => {
        return new Promise((resolve, reject) => {
          const id = crypto.randomUUID();
          messages.set(id, { resolve, reject });

          worker.onmessage = (event) => {
            const { id: responseId, result, error } = event.data;
            const { resolve: res, reject: rej } = messages.get(responseId);
            messages.delete(responseId);

            if (error) {
              rej(new Error(error));
            } else {
              res(result);
            }
          };

          worker.postMessage({ id, method, args });
        });
      };
    },
  };

  return new Proxy({}, handler);
}
