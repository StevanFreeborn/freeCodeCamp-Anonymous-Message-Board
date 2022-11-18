import { Logtail } from '@logtail/node';
import { LogtailTransport } from '@logtail/winston';

const logTailTransport = () => new LogtailTransport(
    new Logtail(process.env.LOGTAIL_TOKEN)
);

export default logTailTransport;