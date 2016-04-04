/**
 * Project exception
 */
export default class Exception {

  /**
   * Create a new Exception
   * @param  {string} code  The error code
   * @param  {string} stack The stack trace
   */
  constructor(code, stack) {
    this.code = code;
    this.stack = stack;
  }
}
