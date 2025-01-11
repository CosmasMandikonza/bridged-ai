/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_AZURE_B2C_CLIENT_ID: string
    readonly VITE_AZURE_B2C_TENANT_NAME: string
    readonly VITE_AZURE_B2C_DOMAIN: string
    readonly VITE_REDIRECT_URI: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }