export const environment = {
  production: false,
  msalConfig: {
    auth: {
      clientId: '37678051-8925-41c9-b29a-4f4b58165f58',
      authority:
        'https://login.microsoftonline.com/a3c1d4f9-3d52-422f-85b1-d3055719c1fb',
    },
  },
  apiConfig: {
    scopes: ['user.read'],
    uri: 'https://graph.microsoft.com/v1.0/me',
  },
  apiUrl: 'https://localhost:7103',
  appInactiveTimeout: 900, // 15 minutes
};
