import logger from "../logging/logger.js";

export default function (app) {
    app.use((err, req, res, next) => {
        logger.error(err.message, { error: err });

        if (res.headersSent) {
            return next(err);
        }

        res.status(500).json({
            error: 'We\'ve encountered an error'
        })
    });
  }