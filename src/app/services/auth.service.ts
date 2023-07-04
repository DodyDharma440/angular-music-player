import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHandler, HttpRequest } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { RootState } from '../models/state.model';
import { ClearStateAction, GetUserDataAction } from '../actions/user.action';
import { serialize } from '../utils/request';
import { SpotifyCallbackResponse } from '../models/auth.model';
import { UserService } from './user.service';
import { User } from '../models/user.model';
import { SongService } from './song.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private store: Store<RootState>,
    private http: HttpClient,
    private userService: UserService,
    private songService: SongService
  ) {}

  isAuthenticated(): boolean {
    return Boolean(localStorage.getItem('access_token'));
  }

  getAccessToken(): string {
    return localStorage.getItem('access_token') || '';
  }

  getRefreshToken(): string {
    return localStorage.getItem('refresh_token') || '';
  }

  generateBasicToken() {
    return `Basic ${btoa(
      `${environment.spotifyConfig.clientId}:${environment.spotifyConfig.clientSecret}`
    )}`;
  }

  requestAccessToken(code: string) {
    const body = {
      code,
      redirect_uri: environment.spotifyConfig.redirectUrl,
      grant_type: 'authorization_code',
    };

    this.http
      .post('https://accounts.spotify.com/api/token', serialize(body), {
        headers: {
          Authorization: this.generateBasicToken(),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .subscribe((data) => {
        const response = data as SpotifyCallbackResponse;
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
        window.location.href = '/home';
        this.userService.getUserData().subscribe((data) => {
          this.store.dispatch(GetUserDataAction({ payload: data as User }));
        });
      });
  }

  requestRefreshToken(refreshToken: string) {
    const body = {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    };

    return this.http.post(
      'https://accounts.spotify.com/api/token',
      serialize(body),
      {
        headers: {
          Authorization: this.generateBasicToken(),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
  }

  logout() {
    this.songService.updateSongPlayer({ isPlaying: false });
    const url = 'https://accounts.spotify.com/en/logout';
    const spotifyLogoutWindow = window.open(
      url,
      'Spotify Logout',
      'width=700,height=500,top=40,left=40'
    );
    setTimeout(() => {
      this.store.dispatch(ClearStateAction());
      spotifyLogoutWindow?.close();
      this.router.navigate(['/login']);
    }, 500);
  }
}
