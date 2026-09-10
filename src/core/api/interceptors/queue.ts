 
type QueueCallback = (token: string) => void;

let requestsQueue: QueueCallback[] = [];

 
export const queueRequest = (originalRequest: any) =>
  new Promise((resolve) => {
    requestsQueue.push((token: string) => {
      originalRequest.headers['Authorization'] = `Bearer ${token}`;
      resolve(originalRequest);
    });
  });

 
export const processQueue = (token: string) => {
  requestsQueue.forEach((callback) => callback(token));
  requestsQueue = [];
};
