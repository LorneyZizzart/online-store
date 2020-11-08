import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SettingsService, StartupService, TokenService, User } from '@core';
import { AuthService, ClientService } from '@shared';
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
    private _toastrService: ToastrService,
    private _clientService:ClientService
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
      this._clientService.loginClient(this.loginForm.value)
      .then((data:any) => {
        if(data.ok){
          data.client.avatar = '/assets/images/user.png';
          this.successUser(data.client, '/');
          this.router.navigateByUrl('/');
        }else{
          this._authService.login(this.loginForm.value)
          .then((data) => {        
            const user = {
              id: data.user.uid,
              name: 'Administrador',
              fullname: 'Administrador',
              email: data.user.email,
              avatar: '/assets/images/avatar.jpg',
            } as User;
            this.successUser(user, '/admin/dashboard');
          })
          .catch((error) => {
            this._toastrService.clear();
            this._toastrService.error('Usuario incorrecto', 'Error');
          });
        }
      })
      .catch((error) => {
        this._toastrService.clear();
        this._toastrService.error('Usuario incorrecto', 'Error');
      });
    }
  }

  successUser(user:User, dir:string){
    this._toastrService.clear();
    this._toastrService.success(user.fullname, 'Bienvenido');
    const { token, email, id } = { token: 'jhonny-dev-token', id: user.id, email: user.email};
    // Set user info
    this.settings.setUser(user);
    // Set token info
    this.token.set({ token, id, email });
    // Regain the initial data
    this.startup.load().then(() => {
      let url = this.token.referrer!.url || dir;
      if (url.includes('/auth')) {
        url = dir;
      }
      this.router.navigateByUrl(url);
    });


  }
}
