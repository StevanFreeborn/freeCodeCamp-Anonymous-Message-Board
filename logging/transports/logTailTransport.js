import { Logtail } from '@logtail/node';
import { LogtailTransport } from '@logtail/winston';

const logTailTransport = () => new LogtailTransport(
    new Logtail('ZyzmGtuwXAT19sy4C8c6cvK7')
);

export default logTailTransport;
