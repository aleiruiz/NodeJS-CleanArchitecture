export default function makePostUser({ addUser }) {
  return async function postUser(httpRequest) {
    try {
      const { ...userInfo } = httpRequest.body;
      const createdUser = await addUser(userInfo);
      return {
        headers: {
          "Content-Type": "application/json",
          "Last-Modified": new Date(userInfo.modifiedOn).toUTCString(),
        },
        statusCode: 201,
        body: { posted: createdUser },
      };
    } catch (e) {
      // TODO: Error logging
      console.log(e);

      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 400,
        body: {
          error: e.message,
        },
      };
    }
  };
}
