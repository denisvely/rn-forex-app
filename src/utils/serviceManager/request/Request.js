class Request {
  body = null;
  headers = {};
  method = null;
  path = null;
  urlencodedParams = new FormData();
  urlParams = "";
  urlParam = "";

  onSuccessListeners = [];
  onErrorListeners = [];
  onFetchListeners = [];

  pathVariables = {};
  queryParameters = {};

  url = null;

  constructor(path, method) {
    this.path = path;
    this.method = method;
  }

  setBody(body) {
    this.body = body;
  }

  setBodyProp(key, value) {
    this.body = { ...this.body, [key]: value };
  }

  convertToQueryParams(resources, token) {
    var options = {
      token: token,
      resources: JSON.stringify(resources),
    };

    const queryParams = [];
    for (const i in options) {
      queryParams.push(
        encodeURIComponent(i) + "=" + encodeURIComponent(options[i])
      );
    }
    this.body = queryParams.join("&");
  }

  convertToQueryParamsWithoutToken(options) {
    const queryParams = [];
    for (const i in options) {
      queryParams.push(
        encodeURIComponent(i) + "=" + encodeURIComponent(options[i])
      );
    }

    this.body = queryParams.join("&");
  }

  addUrlencodedParam(key, value) {
    this.urlencodedParams.append(key, value);
  }

  addParamsToTheUrl(params) {
    for (const [i, item] of Object.entries(params)) {
      this.urlParams += `${item}/`;
    }
  }

  addParamToTheUrl(param) {
    this.urlParam = param;
  }

  getParamsToTheUrl() {
    return this.urlParams;
  }

  getParamToTheUrl() {
    return this.urlParam;
  }

  getUrlencodedParams() {
    return this.urlencodedParams;
  }

  getBody() {
    return this.body;
  }

  setHeader(name, value) {
    this.headers[name] = value;
  }

  getHeader(name, defaultValue) {
    if (this.headers.hasOwnProperty(name)) {
      return this.headers[name];
    }

    return defaultValue || null;
  }

  getMethod() {
    return this.method;
  }

  setMethod(method) {
    this.method = method;
  }

  getParsedPath() {
    const pathVars = this.getPathVariables();
    const pathVarsNames = Object.keys(pathVars);
    let path = this.getPath();

    pathVarsNames.forEach((name) => {
      path = path.replace(":" + name, pathVars[name]);
    });

    return path;
  }

  getPath() {
    return this.path;
  }

  setPath(path) {
    this.path = path;
  }

  getId() {
    return this.getMethod() + this.getParsedPath();
  }

  getPathVariable(name, defaultValue) {
    if (this.pathVariables.hasOwnProperty(name)) {
      return this.pathVariables[name];
    }

    return defaultValue !== undefined ? defaultValue : null;
  }

  setPathVariable(name, value) {
    this.pathVariables[name] = value;
  }

  getPathVariables() {
    return this.pathVariables;
  }

  setPathVariables(pathVariables) {
    this.pathVariables = pathVariables;
  }

  getQueryParameter(name, defaultValue) {
    if (this.queryParameters.hasOwnProperty(name)) {
      return this.queryParameters[name];
    }

    return defaultValue !== undefined ? defaultValue : null;
  }

  setQueryParameter(name, value) {
    this.queryParameters[name] = value;
  }

  setQueryParameters(queryParameters) {
    this.queryParameters = queryParameters;
  }

  getQueryParameters() {
    return this.queryParameters;
  }

  getUrl() {
    return this.url;
  }

  setUrl(url) {
    this.url = url;
  }

  onSuccess(cb) {
    this.onSuccessListeners.push(cb);
  }

  // Trigger loaded and successful state
  success = (...args) => {
    this.onSuccessListeners.forEach((func) => {
      func(...args);
    });
  };

  onError(cb) {
    this.onErrorListeners.push(cb);
  }

  // Trigger loaded and unsuccessful state
  error = (...args) => {
    this.onErrorListeners.forEach((func) => {
      func(...args);
    });
  };

  onFetch(cb) {
    this.onFetchListeners.push(cb);
  }

  // Trigger loading state
  fetch = (...args) => {
    this.onFetchListeners.forEach((func) => {
      func(...args);
    });
  };
}

export default Request;
