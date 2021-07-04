class Response {
  status(status) {
    this.statusCode = status;
    return this;
  }

  append(header, value) {
    if (this.header == null) this.header = {};
    Object.assign(this.header, {[header]: value});
    return this;
  }

  send(data) {
    this.data = data;
    return this;
  }
}

export default Response;
