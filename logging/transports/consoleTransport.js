import winston from "winston";

const consoleTransport = () => new winston.transports.Console({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.prettyPrint(),
    winston.format.colorize({
      all: true,
    })
  ),
});

export default consoleTransport;