export default function makePatchUser({ editUser }) {
  return async function patchUser(httpRequest) {
    try {
      const { userInfo } = httpRequest.body;
      const toEdit = {
        ...userInfo,
        id: httpRequest.params.id,
      };

      const patched = await editUser(toEdit);
      const timestamp = new Date(userInfo.modifiedOn).toUTCString();
      return {
        headers: {
          "Content-Type": "application/json",
          "Last-Modified": timestamp,
        },
        statusCode: 200,
        body: { patched },
      };
    } catch (e) {
      // TODO: Error logging
      console.log(e);
      if (e.name === "RangeError") {
        return {
          headers: {
            "Content-Type": "application/json",
          },
          statusCode: 404,
          body: {
            error: e.message,
          },
        };
      }
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
