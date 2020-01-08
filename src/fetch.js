import requestsService from "./requestService";

const fetch = options => {
  return requestsService.registerRequest(options);
};

export default fetch;
