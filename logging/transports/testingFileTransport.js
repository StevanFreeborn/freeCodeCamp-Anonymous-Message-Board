import winston from "winston";
import { join } from 'path';

const testingFileTransport = () => new winston.transports.File({
  level: 'debug',
  filename: join(process.cwd(), `logs/test-${Date.now()}.log`),
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
});

export default testingFileTransport;