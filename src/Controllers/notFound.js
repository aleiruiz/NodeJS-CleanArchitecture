export default async function notFound(httpRequest) {
  return {
    headers: {
      "Content-Type": "application/json",
    },
    body: { error: httpRequest.trans("404") },
    statusCode: 404,
  };
}
