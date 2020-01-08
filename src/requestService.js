import { BehaviorSubject } from "rxjs";
import uuid from "uuid";

let requests = [];
let processingRequests = [];

const requestsSubscriber = new BehaviorSubject(requests);
const requestResolver = new BehaviorSubject("");
const requestRejector = new BehaviorSubject("");
const processingRequestsSubscriber = new BehaviorSubject(processingRequests);

const removeFromProcessingList = requestId => {
  let newProcessingRequests = processingRequests;
  newProcessingRequests.splice(newProcessingRequests.indexOf(requestId));
  processingRequestsSubscriber.next(newProcessingRequests);
};

const resolveRequest = request => {
  const { requestId } = request;

  let r = requests;
  r = r.filter(i => i.requestId !== requestId);
  requests = r;
  requestsSubscriber.next(r);
  requestResolver.next(request);
};

const rejectRequest = request => {
  const { requestId } = request;

  let r = requests;
  r = r.filter(i => i.requestId !== requestId);
  requests = r;
  requestsSubscriber.next(r);
  requestRejector.next(request);
};

export const registerRequest = requestOptions => {
  const requestId = uuid();
  const r = {
    requestId,
    requestOptions
  };

  processingRequestsSubscriber.next([...processingRequests, requestId]);

  const requestPromise = new Promise((resolve, reject) => {
    requestResolver.subscribe(resolvedRequest => {
      const { requestId: resolvedRequestId, customResponse } = resolvedRequest;
      if (resolvedRequestId === requestId) {
        console.log("RESOLVED", customResponse);
        if (customResponse) {
          resolve(JSON.parse(customResponse));
        } else {
          resolve(requestOptions.response);
        }
        removeFromProcessingList(requestId);
      }
    });

    requestRejector.subscribe(rejectRequest => {
      console.log(rejectRequest);
      const { requestId: rejectRequestId } = rejectRequest;
      if (rejectRequestId === requestId) {
        reject(requestOptions.error);
        removeFromProcessingList(rejectRequestId);
      }
    });
  });

  requests = [...requests, r];
  requestsSubscriber.next(requests);
  // setTimeout(() => {
  //   resolveRequest(requestId);
  // }, 3000);
  return requestPromise;
};

export default {
  subscriber: requestsSubscriber,
  registerRequest
};

export { resolveRequest, rejectRequest };
