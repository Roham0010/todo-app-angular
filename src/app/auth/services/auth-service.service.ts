import {Injectable} from '@angular/core';
import { AuthResponse, LoginForm, RegisterForm } from '../types/types';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../constants';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn =new BehaviorSubject<boolean>(this.isLoggedIn());
  loggingStatus = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {
    
  }

  changeAuthStatus(value: boolean): void {
    this.loggedIn.next(value);
  }

  getToken(): string | null {
    return localStorage.getItem('_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  setToken(token: string): void {
    localStorage.setItem('_token', token);
  }

  removeToken(): void {
    localStorage.removeItem('_token');
  }

  logout() {
    this.changeAuthStatus(false);
    this.removeToken();
  }

  login(form: LoginForm): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(Constants.baseUrl + 'login', form);
  }

  register(form: RegisterForm): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(Constants.baseUrl + 'register', form);
  }
}
