export default function makePostUser({ addUser }) {
  return async function postUser(httpRequest) {
    try {
      const { ...userInfo } = httpRequest.body;

      const posted = await addUser({
        ...userInfo,
        files: httpRequest.files,
      });
      return {
        headers: {
          "Content-Type": "application/json",
          "Last-Modified": new Date(userInfo.modifiedOn).toUTCString(),
        },
        statusCode: 200,
        body: { ...posted },
      };
    } catch (e) {
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
