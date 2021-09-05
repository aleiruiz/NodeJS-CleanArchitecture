export default async function testAuth(httpRequest) {
  return {
    headers: {
      "Content-Type": "application/json",
    },
    body: { message: `Usuario Authenticado: ${httpRequest.auth.userName}` },
    statusCode: 200,
  };
}
