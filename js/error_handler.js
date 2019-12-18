/*
  Error Handler helper class. Given the way that the API server responds when
  an error in encountered, we know that the HTTP status code is non-200 and that
  the error message is contained in the msg parameter. Thus we can throw an 
  error when with the returned message when one is encountered. This is caught 
  by the Postman common pattern.
*/
export class ErrorHandler {
  static async handle(info) {
    if (info['status'] == 200) {
      return info;
    } else {
      throw Error(info['msg']);
    }
  }
}