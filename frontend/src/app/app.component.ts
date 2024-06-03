import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <app-navbar class="navbar-container" [pageTitle]="pageTitle"></app-navbar>
    </div>
  `,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
  token!: string;
  pageTitle: string = 'Dashboard';

  constructor(private router: Router, private authService: AuthService) {
    if (this.authService.isLoggedIn()) {
      this.token = this.authService.getTokenfromLocal();
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        console.log('this.router.url', this.router.url);
        const currentRoute = this.router.url.split('/')[1];
        this.pageTitle = this.getPageTitle(currentRoute);
      });
  }

  getPageTitle(route: string): string {
    switch (route) {
      case 'dashboard':
        return 'Dashboard';
      case 'order':
        return 'Order';
      case 'customer':
        return 'Customer';
      case 'product':
        return 'Product';
      case 'about':
        return 'About';
      default:
        return 'Dashboard';
    }
  }
}
