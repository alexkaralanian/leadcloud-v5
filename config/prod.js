module.exports = {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
  SESSION_SECRET: process.env.SESSION_SECRET,
  DB_HOST: process.env.RDS_HOSTNAME,
  DB_PORT: process.env.RDS_PORT,
  DB_NAME: process.env.RDS_DB_NAME,
  DB_USERNAME: process.env.RDS_USERNAME,
  DB_PASSWORD: process.env.RDS_PASSWORD,
  REDIS_URI: process.env.REDIS_URI,
  SENDGRID_KEY: process.env.SENDGRID_KEY,
  AWS_KEY: process.env.AWS_KEY,
  AWS_SECRET: process.env.AWS_SECRET
};
