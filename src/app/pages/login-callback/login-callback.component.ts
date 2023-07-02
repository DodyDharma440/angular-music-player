import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GetUserDataAction } from 'src/app/actions/user.action';
import { spotifyConfig } from 'src/app/environments/environment';
import { SpotifyCallbackResponse } from 'src/app/models/auth.model';
import { State } from 'src/app/models/state.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { serialize } from 'src/app/utils/request';

@Component({
  selector: 'app-login-callback',
  templateUrl: './login-callback.component.html',
})
export class LoginCallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
    private store: Store<State>
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.onCallback(params['code']);
    });
  }

  onCallback(callbackCode: string) {
    if (callbackCode) {
      this.http
        .post(
          'https://accounts.spotify.com/api/token',
          serialize({
            code: callbackCode,
            redirect_uri: spotifyConfig.redirectUrl,
            grant_type: 'authorization_code',
          }),
          {
            headers: {
              Authorization: `Basic ${btoa(
                `${spotifyConfig.clientId}:${spotifyConfig.clientSecret}`
              )}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        )
        .subscribe((data) => {
          const response = data as SpotifyCallbackResponse;
          localStorage.setItem('access_token', response.access_token);
          this.router.navigate(['/home']);
          this.userService.getUserData().subscribe((data) => {
            this.store.dispatch(GetUserDataAction({ payload: data as User }));
          });
        });
    } else {
      this.router.navigate(['/login']);
    }
  }
}
