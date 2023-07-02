import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private http: HttpClient) {}

  isAuthenticated(): boolean {
    return Boolean(localStorage.getItem('access_token'));
  }

  getAccessToken(): string {
    return localStorage.getItem('access_token') || '';
  }

  logout() {
    const url = 'https://accounts.spotify.com/en/logout';
    const spotifyLogoutWindow = window.open(
      url,
      'Spotify Logout',
      'width=700,height=500,top=40,left=40'
    );
    setTimeout(() => {
      spotifyLogoutWindow?.close();
      localStorage.removeItem('access_token');
      this.router.navigate(['/login']);
    }, 2000);
  }
}
