import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login-callback',
  templateUrl: './login-callback.component.html',
})
export class LoginCallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.onCallback(params['code']);
    });
  }

  onCallback(callbackCode: string) {
    if (callbackCode) {
      this.authService.requestAccessToken(callbackCode);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
