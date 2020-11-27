class ApplicationError extends Error {
    constructor(params = {}) {
      super();
  
      this.message = params.message || 'An error occurred. Please try again later';
      this.type = params.type || 'Application Error';
      this.status = params.status || 500;
    }
  }
  
  export default ApplicationError;
  