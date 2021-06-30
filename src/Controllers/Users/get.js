export default function makeGetUsers({ listUsers }) {
  return async function getUsers(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const listOfUsers = await listUsers({
        postId: httpRequest.query.postId,
      });
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
