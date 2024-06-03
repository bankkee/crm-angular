import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  getTokenfromLocal(): string {
    return localStorage.getItem('token') || '';
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  setTokentoLocal(token: string): void {
    localStorage.setItem('token', token);
  }

  logout(): void {
    // Implement your logout logic here
    localStorage.removeItem('token');
  }
}
