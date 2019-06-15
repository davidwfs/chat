import log from './services/winston';
import app from './config/express';

const port = process.env.port || 5000;

app.listen(port, () => log.info(`Server run in port ${port}.`));
