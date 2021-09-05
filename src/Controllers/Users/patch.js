export default function makePatchUser({ editUser }) {
  return async function patchUser(httpRequest) {
    try {
      const { ...changes } = httpRequest.body;

      const patched = await editUser({
        ...changes,
        id: httpRequest.params.id,
        files: httpRequest.files,
      });
      const timestamp = new Date(changes.modifiedOn).toUTCString();
      return {
        headers: {
          "Content-Type": "application/json",
          "Last-Modified": timestamp,
        },
        statusCode: 200,
        body: { ...patched },
      };
    } catch (e) {
      // TODO: Error logging
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
