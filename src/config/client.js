import 'dotenv/config';

const { CLIENTS } = process.env;

export default CLIENTS.split(',');
