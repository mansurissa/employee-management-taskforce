class ErrorResponse extends Error {
  constructor(msg, status) {
    super(msg);
    this.statusCode = status;
  }
}
export default ErrorResponse;
