/* eslint-disable max-len */

export const port = process.env.PORT || 3000;
export const host = process.env.WEBSITE_HOSTNAME || `localhost:${port}`;

// export const databaseUrl = process.env.DATABASE_URL || 'sqlite:database.sqlite';

export const analytics = {

  // https://analytics.google.com/
  google: {
    trackingId: process.env.GOOGLE_TRACKING_ID // UA-XXXXX-X
  }

};

export const api = process.env.API_URL || 'https://api.krissorbie.com';
// export const api = process.env.API_URL || 'http://localhost:8888';

export const mannequinHeadsSlugs = ['ks-long-head', 'ks-color-head', 'ks-schoolboy-and-ks-schoolgirl-mannequin-heads'];
