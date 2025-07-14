export default () => ({
  app: {
    port: process.env.PORT,
  },
  database: {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT, 10),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
  auth: {
    saltRounds: process.env.SALTROUNDS,
  },
  jwt: {
    secret: process.env.JWTSECRET,
    expiresIn: process.env.EXPIRESIN,
  },
});
