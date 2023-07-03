import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

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
    urlParams.append('client_id', environment.spotifyConfig.clientId);
    urlParams.append('scope', environment.spotifyConfig.scope.join(' '));
    urlParams.append('redirect_uri', environment.spotifyConfig.redirectUrl);
    urlParams.append('state', environment.spotifyConfig.state);

    window.location.href = `${
      environment.spotifyConfig.authEndpoint
    }?${urlParams.toString()}`;
  }
}
