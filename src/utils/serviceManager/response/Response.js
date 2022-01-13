class Response {
  body = null;
  headers = {};
  statusCode = null;

  constructor(statusCode) {
    this.statusCode = statusCode;
  }

  getBody() {
    return this.body.data;
  }

  setBody(body) {
    this.body = body;
  }

  getAttributes = () => {
    const body = this.getBody();
    return body?.data?.attributes ?? null;
  };

  getHeader(name, defaultValue) {
    const headerName = name.toLowerCase();

    if (this.headers.hasOwnProperty(headerName)) {
      return this.headers[headerName];
    }

    return !!defaultValue && defaultValue;
  }

  setHeader(name, value) {
    return (this.headers[name.toLowerCase()] = value);
  }

  getHeaders() {
    return this.headers;
  }

  setHeaders() {
    const headerNames = Object.keys(this.headers);

    headerNames.forEach((name) => {
      this.setHeader(name, this.headers[name]);
    });
  }

  getStatusCode() {
    return this.statusCode;
  }
}

export default Response;
