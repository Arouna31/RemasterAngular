import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../../services/layout.service';
import { User } from 'src/app/shared/models/user';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'al-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  homePath: string = 'home';
  loginPath: string = 'login';
  registerPath: string = 'register';
  user: User | null;
  private subscription: Subscription;

  constructor(
    private router: Router,
    private layoutService: LayoutService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.subscription = this.authService.user$.subscribe(
      (user) => (this.user = user)
    );
  }

  public isActive(page: string): boolean {
    /* Angular 11 ou inférieur 
   return this.router.isActive(page, true); */
    // Angular 12 ou supérieur
    return this.router.isActive(page, {
      paths: 'exact',
      queryParams: 'exact',
      fragment: 'ignored',
      matrixParams: 'ignored',
    });
  }

  public navigate(page: string): void {
    this.router.navigate([page]);
  }

  toggleSidenav() {
    this.layoutService.toggleSidenav();
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
