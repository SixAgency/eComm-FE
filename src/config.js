/* eslint-disable max-len */

export const port = process.env.PORT || 3000;
export const host = process.env.WEBSITE_HOSTNAME || `localhost:${port}`;

// export const databaseUrl = process.env.DATABASE_URL || 'sqlite:database.sqlite';

export const analytics = {

  // https://analytics.google.com/
  google: {
    trackingId: process.env.GOOGLE_TRACKING_ID, // UA-XXXXX-X
  },

};

export const api = process.env.API_URL || 'http://staging.ecomm.com';
// export const api = process.env.API_URL || 'http://localhost:8888';

// export const faketoken = '5cc524ea3aebceb719386b73099f0d881f951fc1e64c9523';
export const faketoken = 'a2169dfff47ef681825af95b2a49772291777e01ea6b8985';
