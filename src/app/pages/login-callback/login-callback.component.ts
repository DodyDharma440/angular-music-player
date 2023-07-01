import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { spotifyConfig } from 'src/app/environments/environment';
import { SpotifyCallbackResponse } from 'src/app/models/auth.model';
import { serialize } from 'src/app/utils/request';

@Component({
  selector: 'app-login-callback',
  templateUrl: './login-callback.component.html',
})
export class LoginCallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
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
        });
    } else {
      this.router.navigate(['/login']);
    }
  }
}
