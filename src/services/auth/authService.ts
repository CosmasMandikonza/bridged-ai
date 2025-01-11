// src/services/auth/authService.ts
import { msalService } from './msalService';

export const authService = {
  async login() {
    return msalService.loginPopup();
  },

  async logout() {
    return msalService.logout();
  },

  getCurrentUser() {
    return msalService.getAccount();
  },

  isAuthenticated() {
    return !!msalService.getAccount();
  }
};