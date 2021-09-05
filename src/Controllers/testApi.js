export default async function test({}) {
  return {
    headers: {
      "Content-Type": "application/json",
    },
    body: { message: `Server is working! API Root: ${process.env.API_ROOT}` },
    statusCode: 200,
  };
}
