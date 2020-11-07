import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SettingsService, StartupService, TokenService } from '@core';
import { AuthService } from '@shared';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private token: TokenService,
    private startup: StartupService,
    private settings: SettingsService,
    private _authService:AuthService,
    private _toastrService: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['admin@admin.com', [Validators.required]],
      password: ['123456', [Validators.required]],
    });
  }

  ngOnInit() {}

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    if(this.loginForm.valid){
      this._toastrService.info('Auntenticando, espere...');
      this._authService.login(this.loginForm.value)
      .then((credencialesUsuario) => {
        this._toastrService.clear();
        this._toastrService.success(credencialesUsuario.user.displayName, 'Bienvenido');
        const { token, email, uid } = { token: 'ng-matero-token', uid: 1, email: this.loginForm.value.email};
        // Set user info
        this.settings.setUser({ id: uid, email: email, avatar: '' });
        // Set token info
        this.token.set({ token, uid, email });
        // Regain the initial data
        this.startup.load().then(() => {
          let url = this.token.referrer!.url || '/';
          if (url.includes('/auth')) {
            url = '/';
          }
          this.router.navigateByUrl(url);
        });
      })
      .catch((error) => {
        this._toastrService.clear();
        this._toastrService.error('Usuario incorrecto', 'Error');
      });
    }
  }
}
