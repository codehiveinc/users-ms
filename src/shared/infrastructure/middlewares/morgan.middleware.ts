import morgan from "morgan";

const morganMiddleware = morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    "-",
    tokens["response-time"](req, res),
    "ms",
  ].join(" ");
});

export default morganMiddleware;
