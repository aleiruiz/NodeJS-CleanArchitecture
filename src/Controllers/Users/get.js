export default function makeGetUsers({ getUser }) {
  return async function getUsers(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const listOfUsers = await getUser({ ...httpRequest.query });
      return {
        headers,
        statusCode: 200,
        body: listOfUsers,
      };
    } catch (e) {
      // TODO: Error logging
      console.log(e);
      return {
        headers,
        statusCode: 400,
        body: {
          error: e.message,
        },
      };
    }
  };
}
