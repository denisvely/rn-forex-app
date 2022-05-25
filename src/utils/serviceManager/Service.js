import ServiceManager from "./ServiceManager";

class Service {
  loading = false;
  loaded = false;
  error = null;
  serviceManager = null;

  url = null;
  config = null;

  constructor(path, method) {
    this.path = path;
    this.method = method;
  }

  getErrorMsg() {
    return this.errorMessage;
  }

  serviceLoading() {
    this.loading = true;
    this.loaded = false;
    this.errorMessage = null;
  }

  reset() {
    this.loading = false;
    this.loaded = false;
    this.errorMessage = null;
  }

  serviceLoaded() {
    this.loading = false;
    this.loaded = true;
    this.errorMessage = null;
  }

  serviceError(errorMessage) {
    this.loading = false;
    this.loaded = true;
    this.errorMessage = errorMessage;
  }

  isLoading() {
    return this.loading;
  }

  isLoaded() {
    return this.loaded;
  }

  hasErrors() {
    return !!this.errorMessage;
  }

  setPrepareRequest = (cb) => {
    this.prepareRequest = cb;
  };

  setFormatResponse = (cb) => {
    this.formatResponse = cb;
  };

  /**
   * Adapt service to Promise
   * no change of service flow
   *
   * @returns {Promise}
   */
  fetch = (...args) => {
    // Create fresh Request object every time
    let request = ServiceManager.prepareRequest(this.path, this.method);

    request.onSuccess(() => {
      this.serviceLoaded();
    });

    request.onError((dispatch, { error }) => {
      // TODO: extract error from response
      this.serviceError(error);
    });
    if (this.prepareRequest) {
      request = this.prepareRequest(request, ...args);
    }

    this.serviceLoading();
    return ServiceManager.executeRequest(request).then((response) => {
      if (!!this.formatResponse) {
        return this.formatResponse(response);
      }

      return response;
    });
  };
}

export default Service;
