/* eslint-disable max-len */
/**
 *
 * DON'T IMPORT THIS CONFIG ON CLIENT SIDE.
 * THIS SHOULD BE USED ONLY ON SERVER SIDE.
 *
 */
const config = {
  development: {
    port: 3000,
    api: 'https://api.krissorbie.com',
    redis: {
      host: 'localhost',
      port: 6379,
      secret: 'secret key'
    }
  },
  production: {
    port: 3000,
    api: 'https://api.krissorbie.com',
    redis: {
      host: 'red001.4swfkm.0001.usw2.cache.amazonaws.com',
      port: 6379,
      secret: 'hAeeahGsdzKdMSjRpseRiX2Iyrix3WFm'
    }
  }
};

export default config;
