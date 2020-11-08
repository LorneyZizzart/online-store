import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService, SettingsService, TokenService, User } from '@core';

@Component({
  selector: 'app-user',
  template: `
    <button
      class="matero-toolbar-button matero-avatar-button"
      mat-button
      [matMenuTriggerFor]="menu"
    >
      <img class="matero-avatar" [src]="user.avatar" width="32" alt="avatar" />
      <span class="matero-username" fxHide.lt-sm>{{ user.name }}</span>
    </button>

    <mat-menu #menu="matMenu" class="bg-azul1-store">
      <button  mat-menu-item class="text-white">
        <mat-icon class="text-white">account_circle</mat-icon>
        <span>{{ 'user.profile' | translate }}</span>
      </button>
      <button  mat-menu-item class="text-white">
        <mat-icon class="text-white">settings</mat-icon>
        <span>{{ 'user.settings' | translate }}</span>
      </button>
      <button mat-menu-item class="text-white" (click)="logout()">
        <mat-icon class="text-white">exit_to_app</mat-icon>
        <span>{{ 'user.logout' | translate }}</span>
      </button>
    </mat-menu>
  `,
})
export class UserComponent {
  user: User;

  constructor(
    private router: Router,
    private settings: SettingsService,
    private token: TokenService,
    private menu: MenuService
  ) {
    this.user = settings.user;
  }

  logout() {
    this.token.clear();
    this.settings.removeUser();
    this.menu.reset();
    this.router.navigateByUrl('/auth/login');
  }
}
