import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { spotifyConfig } from 'src/app/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('access_token')) {
      this.router.navigate(['/home']);
    }
  }

  onLogin() {
    const urlParams = new URLSearchParams();
    urlParams.append('response_type', 'code');
    urlParams.append('client_id', spotifyConfig.clientId);
    urlParams.append('scope', spotifyConfig.scope.join(' '));
    urlParams.append('redirect_uri', spotifyConfig.redirectUrl);
    urlParams.append('state', spotifyConfig.state);

    window.location.href = `${
      spotifyConfig.authEndpoint
    }?${urlParams.toString()}`;
  }
}
