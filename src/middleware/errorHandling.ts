// src/middleware/errorHandling.ts
export class AuthError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'AuthError';
    }
  }
  
  export const handleAuthError = (error: any): string => {
    if (error.errorCode) {
      switch (error.errorCode) {
        case 'user_cancelled':
          return 'Login was cancelled';
        case 'consent_required':
          return 'Please grant the required permissions';
        default:
          return 'An authentication error occurred';
      }
    }
    return error.message || 'An unexpected error occurred';
  };