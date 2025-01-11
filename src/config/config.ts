// src/config/config.ts
// Extract environment variables
const tenantName = import.meta.env.VITE_AZURE_B2C_TENANT_NAME;
const domain = import.meta.env.VITE_AZURE_B2C_DOMAIN;
const clientId = import.meta.env.VITE_AZURE_B2C_CLIENT_ID;
const redirectUri = import.meta.env.VITE_REDIRECT_URI;

// MSAL configuration object
export const msalConfig = {
  auth: {
    clientId,
    authority: `https://${tenantName}.b2clogin.com/${domain}/B2C_1_signupsignin/v2.0/`,
    knownAuthorities: [`${tenantName}.b2clogin.com`],
    redirectUri,
    navigateToLoginRequestUrl: true,
    postLogoutRedirectUri: window.location.origin
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false
  },
  system: {
    allowNativeBroker: false, // Disables WAM Broker
    loggerOptions: {
      logLevel: "Info",
      piiLoggingEnabled: false
    }
  }
};

// Login request configuration
export const loginRequest = {
  scopes: ["openid", "profile", "email"],
  prompt: "select_account"
};

// Token request configuration for API access
export const tokenRequest = {
  scopes: ["openid", "profile", "email"],
  forceRefresh: false
};