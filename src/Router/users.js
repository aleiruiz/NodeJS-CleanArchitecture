import {
  deleteUser,
  getUsers,
  postUser,
  patchUser,
} from "../Controllers/Users";

import { auth } from "../Middleware";

export default (prefix, app, makeCallback) => {
  /**
   * Creates Users
   * @route POST /users
   * @group Users
   * @consumes multipart/form-data -
   * @param {string} Accept-Language.header - Active Language
   * @param {file} profilePic.formData.required - User Profile Pic
   * @param {string} userName.formData.required - User Username
   * @param {string} email.formData.required - User Email - eg: user@domain
   * @param {string} firstName.formData.required - User First Name
   * @param {string} lastName.formData.required - User Last Name
   * @param {string} password.formData.required - User Password
   * @param {string} confirmPassword.formData.required - User Confirm Password
   * @returns {User.model} 200 - An object with status message
   * @returns {BadResponse.model} 400 - There is an error in the request
   * @returns {Error}  500 - Error
   * @security JWT
   */
  app.post(`${prefix}/users`, makeCallback(postUser));

  /**
   * Deletes Users
   * @route DELETE /users/{id}
   * @group Users
   * @consumes application/json -
   * @param {string} Accept-Language.header - Active Language
   * @param {string} id.path.required - Target User Id
   * @returns {DeleteResponse.model} 200 - An object with status message
   * @returns {BadResponse.model} 400 - There is an error in the request
   * @returns {Error}  500 - Error
   * @security JWT
   */
  app.delete(`${prefix}/users/:id`, makeCallback(deleteUser, [auth]));

  /**
   * Updates Users
   * @route PATCH /users/{id}
   * @group Users
   * @consumes multipart/form-data -
   * @param {string} Accept-Language.header - Active Language
   * @param {string} id.path.required - Target User Id
   * @param {file} profilePic.formData.required - User Profile Pic
   * @param {string} userName.formData.required - User Username
   * @param {string} email.formData.required - User Email - eg: user@domain
   * @param {string} firstName.formData.required - User First Name
   * @param {string} lastName.formData.required - User Last Name
   * @returns {User.model} 200 - An array of user info
   * @returns {BadResponse.model} 400 - There is an error in the request
   * @returns {Error}  500 - Error
   * @security JWT
   */
  app.patch(`${prefix}/users/:id`, makeCallback(patchUser, [auth]));

  /**
   * Gets a list of users
   * @route GET /users
   * @group Users
   * @param {string} Accept-Language.header - Active Language
   * @param {string} id.query.required - Target User Id
   * @param {string} userName.query.required - User Username
   * @param {string} email.query.required - User Email - eg: user@domain
   * @param {string} firstName.query.required - User First Name
   * @param {string} lastName.query.required - User Last Name
   * @returns {Array.<User>} 200 - An array of Users
   * @returns {BadResponse.model} 400 - There is an error in the request
   * @returns {Error}  500 - There is an internal error
   * @security JWT
   */
  app.get(`${prefix}/users`, makeCallback(getUsers, [auth]));
};
