import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from '../models/state.model';
import { GetUserDataAction } from '../actions/user.action';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private store: Store<State>) {}

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
      this.store.dispatch(GetUserDataAction({ payload: null }));
      spotifyLogoutWindow?.close();
      localStorage.removeItem('access_token');
      this.router.navigate(['/login']);
    }, 1000);
  }
}
