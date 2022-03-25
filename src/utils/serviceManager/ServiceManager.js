/* eslint-disable no-unused-vars */
import axios from "axios";
import Request from "./request/Request";
import Resp from "./response/Response";
import { INVALID_TOKEN } from "../../store/app";
import * as apiConstants from "./const";

class ServiceManager {
  /**
   * @type {Map|null}
   */
  store = null;

  token = null;

  accessToken = null;

  /**
   * @param store
   */
  setStore(store) {
    this.store = store;
  }

  /**
   * @param path {String} Endpoint path; may include path variables
   * @param method {String} HTTP method
   * @returns {Request}
   */
  prepareRequest(path, method) {
    return new Request(path, method);
  }

  /**
   * @param request {Request} Prepared API request
   */
  executeRequest = (request) => {
    const fetchConfig = this.prepareFetchData(request);
    let url = request.getUrl();

    if (!url) {
      url = this.getRequestUrl(request);
    }

    request.fetch(this.dispatchToStore, request);
    return new Promise((res) => {
      axios(url, fetchConfig)
        .then((fetchResponse) => {
          const response = this.handleResponse(fetchResponse, request);

          res(response);
        })
        .catch((error) => {
          let response = error?.toString();

          if (error?.response) {
            response = this.handleResponse(error.response, request);
          }

          request.error(this.dispatchToStore, response);
          res(response);
        });
    });
  };

  /**
   * @param fetchResponse {Response} WebAPI response
   * @param request {Request} Response triggered request
   */
  handleResponse = (fetchResponse, request) => {
    const response = new Resp(fetchResponse.status);

    // Extract headers
    Object.entries(fetchResponse.headers).forEach(([name, value]) => {
      response.setHeader(name, value);
    });

    response.setBody(fetchResponse.data);

    return this.processResponse(request, response);
  };

  dispatchToStore = (action) => {
    if (!!this.store?.dispatch) {
      this.store.dispatch(action);
    }
  };

  /**
   * @param request {Request}
   * @param response {Response}
   */
  processResponse = (request, response) => {
    const status = response.getStatusCode();
    // Successful
    if (this.isResponseSuccessful(response)) {
      request.success(this.dispatchToStore, { response, request });
      return { response, error: null, request };
    }

    const { errors } = response.getBody();
    const errorMessage = !!errors && !!errors[0] ? errors[0].detail : "Server error 500";

    if (errorMessage === "Your session has expired." && !!this.token) {
      this.dispatchToStore({
        type: INVALID_TOKEN,
      });
    }

    const shape = { response, error: errorMessage, request };
    request.error(this.dispatchToStore, shape);

    return shape;
  };

  // eslint-disable-next-line no-empty-function
  static extractError(response) {}

  /**
   * @param response {Response}
   * @returns {boolean}
   */
  isResponseSuccessful = (response) => {
    const statusCode = response.getStatusCode();

    return statusCode >= 200 && statusCode < 304;
  };

  setToken = (token) => {
    this.accessToken = token.accessToken;
    this.token = token;
  };

  getToken = () => {
    return this.token;
  };

  getAccessToken = () => {
    return this.accessToken;
  };

  removeToken = () => {
    this.token = null;
    this.accessToken = null;
  };

  prepareFetchData = (request) => {
    const fetchConfig = {
      headers: {
        Accept: "application/json, text/javascript, */*; q=0.01",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "Accept-Encoding": "gzip, deflate, br",
        Authorization: "OAuth oauth_token=" + this.accessToken,
      },
      method: request.getMethod(),
    };

    if (request.getMethod() === apiConstants.HTTP_METHOD_POST) {
      fetchConfig.data = request.getBody();
    }

    return fetchConfig;
  };

  /**
   * @param request {Request}
   */
  getRequestUrl = (request) => {
    let url = this.getBaseUrl();

    url += request.getParsedPath();
    url += this.getQueryString(request.getQueryParameters());

    return url;
  };

  /**
   * @returns {string}
   */
  getBaseUrl = () => {
    return "https://api.finte.co/";
  };

  /**
   * @returns {string}
   */
  getQueryString = (parameters) => {
    const keys = Object.keys(parameters);

    const queryStrings = [];

    keys.map((key) => queryStrings.push(key + "=" + parameters[key]));

    if (queryStrings.length === 0) {
      return "";
    }

    return "?" + queryStrings.join("&");
  };
}

export default new ServiceManager();

// "appAssociation": "AUTO",
// "rewrites": [ { "source": "/**", "dynamicLinks": true } ]
