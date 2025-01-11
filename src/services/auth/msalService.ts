// src/services/auth/msalService.ts
import { 
  PublicClientApplication, 
  AuthenticationResult, 
  AccountInfo,
  LogLevel,
  BrowserCacheLocation
} from "@azure/msal-browser";
import { msalConfig, loginRequest } from "@/config/config";

class MSALService {
  private static instance: MSALService;
  private msalInstance: PublicClientApplication;

  private constructor() {
    // Enable detailed logging in development
    const msalConfigWithLogging = {
      ...msalConfig,
      system: {
        loggerOptions: {
          loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {
            if (containsPii) {
              return;
            }
            switch (level) {
              case LogLevel.Error:
                console.error(message);
                break;
              case LogLevel.Info:
                console.info(message);
                break;
              case LogLevel.Verbose:
                console.debug(message);
                break;
              case LogLevel.Warning:
                console.warn(message);
                break;
              default:
                console.log(message);
            }
          },
          logLevel: LogLevel.Verbose,
          piiLoggingEnabled: false
        }
      }
    };

    this.msalInstance = new PublicClientApplication(msalConfigWithLogging);
  }

  public static getInstance(): MSALService {
    if (!MSALService.instance) {
      MSALService.instance = new MSALService();
    }
    return MSALService.instance;
  }

  public getMsalInstance(): PublicClientApplication {
    return this.msalInstance;
  }

  public async initialize(): Promise<void> {
    try {
      // Handle redirect promise
      const response = await this.msalInstance.handleRedirectPromise();
      
      // Log the response for debugging
      if (response) {
        console.log('Redirect response:', {
          tokenType: response.tokenType,
          scopes: response.scopes,
          expiresOn: response.expiresOn,
          correlationId: response.correlationId
        });
      }

      // Set active account
      const accounts = this.msalInstance.getAllAccounts();
      if (accounts.length > 0) {
        this.msalInstance.setActiveAccount(accounts[0]);
        console.log('Active account set:', accounts[0].username);
      }
    } catch (error) {
      console.error('MSAL initialization error:', error);
      throw error;
    }
  }

  public async loginPopup(): Promise<AuthenticationResult> {
    try {
      console.log('Initiating login popup with request:', loginRequest);
      const response = await this.msalInstance.loginPopup(loginRequest);
      console.log('Login successful:', response.account?.username);
      this.msalInstance.setActiveAccount(response.account);
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  public async logout(): Promise<void> {
    const account = this.msalInstance.getActiveAccount();
    if (account) {
      try {
        await this.msalInstance.logoutPopup({
          account,
          postLogoutRedirectUri: window.location.origin,
        });
        console.log('Logout successful');
      } catch (error) {
        console.error('Logout error:', error);
        throw error;
      }
    }
  }

  public getAccount(): AccountInfo | null {
    return this.msalInstance.getActiveAccount();
  }

  public async acquireToken(): Promise<string | null> {
    const account = this.getAccount();
    if (!account) {
      console.warn('No active account found');
      return null;
    }

    try {
      const response = await this.msalInstance.acquireTokenSilent({
        ...loginRequest,
        account
      });
      return response.accessToken;
    } catch (error) {
      console.error('Token acquisition error:', error);
      // Fallback to interactive method
      try {
        const response = await this.msalInstance.acquireTokenPopup(loginRequest);
        return response.accessToken;
      } catch (interactiveError) {
        console.error('Interactive token acquisition failed:', interactiveError);
        throw interactiveError;
      }
    }
  }
}

export const msalService = MSALService.getInstance();