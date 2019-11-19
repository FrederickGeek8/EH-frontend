export class ErrorHandler {
  static async handle(info) {
    if (info['status'] == 200) {
      return info;
    } else {
      throw Error(info['msg']);
    }
  }
}