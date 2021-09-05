import trans from "../Localization";
export default (controller, middlewares) => {
  const executeMiddlewares = (request, httpRequest) => {
    for (const middleware of middlewares) {
      httpRequest[middleware.name] = middleware.exec(request);
    }
  };

  return (req, res) => {
    trans.init(req, res);
    try {
      let httpRequest = {
        body: req.body,
        query: req.query,
        params: req.params,
        files: req.files,
        ip: req.ip,
        method: req.method,
        path: req.path,
        headers: {
          "Content-Type": req.get("Content-Type"),
          Referer: req.get("referer"),
          "User-Agent": req.get("User-Agent"),
        },
        trans: res.__,
      };
      if (middlewares) executeMiddlewares(req, httpRequest);
      controller(httpRequest)
        .then((httpResponse) => {
          if (httpResponse.headers) {
            res.set(httpResponse.headers);
          }
          res.type("json");
          res.status(httpResponse.statusCode).send(httpResponse.body);
        })
        .catch((e) => {
          res.status(500).send({ error: "An unkown error occurred." });
        });
    } catch (e) {
      console.log({ error: res.__(e.message) });
      res.status(e.status).send({ error: res.__(e.message) });
    }
  };
};
