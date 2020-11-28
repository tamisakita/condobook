class ErrorHandling {
    // eslint-disable-next-line no-unused-vars
    handle(error, req, res, next) {
      console.log(error);
  
      const { message, type, status } = error;
      const statusCode = status || 500;
  
      return res.status(statusCode).json({ message, type: type || '', status: statusCode });
    }
  }
  
  export default new ErrorHandling();