export default {
  swaggerDefinition: {
    info: {
      description: "Libidoon API definitions",
      title: "Libidoon API",
      version: "1.0.0",
    },
    host: process.env.API_URL,
    basePath: process.env.API_ROOT,
    produces: ["application/json", "application/xml"],
    schemes: ["http", "https"],
    securityDefinitions: {
      JWT: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
        description: "",
      },
    },
  },
  basedir: __dirname, //app absolute path
  files: ["./Router/**/*.js", "./Swagger/**/*.js", "./Entities/**/*.js"], //Path to the API handle folder
};
