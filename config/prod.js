module.exports = {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  SESSION_SECRET: process.env.SESSION_SECRET,
  DB_HOST: process.env.RDS_HOSTNAME,
  DB_PORT: process.env.RDS_PORT,
  DB_NAME: process.env.RDS_DB_NAME,
  DB_USERNAME: process.env.RDS_USERNAME,
  DB_PASSWORD: process.env.RDS_PASSWORD,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT
};
