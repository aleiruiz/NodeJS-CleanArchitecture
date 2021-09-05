import { loginUser } from "../Controllers/Authentication";

export default (prefix, app, makeCallback) => {
  /**
   * Authenticates User
   * @route POST /login
   * @group Auth
   * @param {string} Accept-Language.header - Active Language
   * @param {LoginRequest.model} request.body - request
   * @returns {LoginResponse.model} 200 - An object with status message
   * @returns {BadResponse.model} 400 - There is an error in the request
   * @returns {Error}  500 - Error
   * @security JWT
   */
  app.post(`${prefix}/login`, makeCallback(loginUser));
};

// REQUESTS

/**
 * @typedef  LoginRequest
 * @property {string} email.required
 * @property {string} password.required
 */

// RESPONSES

/**
 * @typedef  LoginResponse
 * @property {object} user.required
 * @property {string} token.required
 */
