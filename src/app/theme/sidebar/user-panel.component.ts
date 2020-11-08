import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService, SettingsService, TokenService, User } from '@core';

@Component({
  selector: 'app-user-panel',
  template: `
    <div class="matero-user-panel" fxLayout="column" fxLayoutAlign="center center">
      <img class="matero-user-panel-avatar" [src]="user.avatar" alt="avatar" width="64" />
      <h4 class="matero-user-panel-name text-white">{{ user.name }}</h4>
      <h5 class="matero-user-panel-email text-green-store">{{ user.email }}</h5>
      <div class="matero-user-panel-icons text-white">
        <a mat-icon-button>
          <mat-icon>account_circle</mat-icon>
        </a>
        <a routerLink="/" mat-icon-button>
          <mat-icon>store</mat-icon>
        </a>
        <a (click)="logout()" mat-icon-button>
          <mat-icon>exit_to_app</mat-icon>
        </a>
      </div>
    </div>
  `,
  styleUrls: ['./user-panel.component.scss'],
})
export class UserPanelComponent {
  user: User;

  constructor(private settings: SettingsService,
    private router: Router,
    private token: TokenService,
    private menu: MenuService) {
    this.user = settings.user;
  }

  logout() {
    this.token.clear();
    this.settings.removeUser();
    this.menu.reset();
    this.router.navigateByUrl('/auth/login');
  }
}
