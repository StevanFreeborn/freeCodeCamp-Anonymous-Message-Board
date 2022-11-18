import ErrorTypes from "./errorTypes.js";

const viewErrorCatcher = routeHandler => async (req, res, next) => {
  try {
    await routeHandler(req, res, next);
  } catch (err) {
    err.type = ErrorTypes.View;
    next(err);
  }
};

export default viewErrorCatcher;