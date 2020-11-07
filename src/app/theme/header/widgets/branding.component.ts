import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <a class="matero-branding" href="#/">
      <img src="./assets/images/logo.png" class="matero-branding-logo-expanded" alt="logo" />
      <span class="matero-branding-name text-white">ONLINE STORE</span>
    </a>
  `,
})
export class BrandingComponent {}
