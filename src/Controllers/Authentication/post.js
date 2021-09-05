export default function makeLogin({ login }) {
  return async function postAuthentication(httpRequest) {
    try {
      const { ...credentials } = httpRequest.body;
      const loggedUser = await login(credentials);
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: { ...loggedUser },
      };
    } catch (e) {
      // TODO: Error logging
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 400,
        body: {
          error: httpRequest.trans(e.message),
        },
      };
    }
  };
}
