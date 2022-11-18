import ErrorTypes from "./errorTypes.js";

const apiErrorCatcher = routeHandler => async (req, res, next) => {
  try {
    await routeHandler(req, res, next);
  } catch (err) {
    err.type = ErrorTypes.Api;
    next(err);
  }
};

export default apiErrorCatcher;