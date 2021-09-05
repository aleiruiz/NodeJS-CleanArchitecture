export default function makeAuth({ jwtUtilities }) {
  return function auth(request) {
    try {
      return jwtUtilities.validateToken(request.headers.authorization);
    } catch (e) {
      throw { message: "unauthorized", status: 401 };
    }
  };
}
