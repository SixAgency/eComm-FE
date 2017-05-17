module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [

    // First application
    {
      name: 'eComm_frontend',
      script: 'server.js',
      out_file: '/logs/app/out.log',
      error_file: '/logs/app/err.log',
      instances: 1,
      exec_mode: 'cluster',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
};

