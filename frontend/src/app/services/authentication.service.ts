import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private authService: AuthService) {}
  login(username: string, password: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      axios
        .post('http://localhost:8080/api/auth/login', { username, password })
        .then((response) => {
          this.authService.setTokentoLocal(response.data.token);
          observer.next(true);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
