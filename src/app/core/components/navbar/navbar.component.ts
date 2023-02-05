import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'al-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
   homePath: string = 'home';
   loginPath: string = 'login';
   registerPath: string = 'register';

   constructor(private router: Router) { }

   public isActive(page: string): boolean {
   /* Angular 11 ou inférieur 
   return this.router.isActive(page, true); */
   // Angular 12 ou supérieur
   return this.router.isActive(page, {paths: 'exact', queryParams: 'exact', fragment: 'ignored', matrixParams: 'ignored'});
  }

  public navigate(page: string): void {
    this.router.navigate([page]);
  }
}
