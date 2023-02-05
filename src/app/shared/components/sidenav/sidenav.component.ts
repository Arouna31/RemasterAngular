import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'al-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
 prefix: string = 'app';
 dashboardPath: string = `${this.prefix}/dashboard`;
 planningPath: string = `${this.prefix}/planning`;
 workdayPath: string = `${this.prefix}/workday`;
 profilPath: string = `${this.prefix}/profil`;
 parametersPath: string = `${this.prefix}/parameters`;

 constructor(private router: Router) { }

 public navigate(page: string): void {
  this.router.navigate([page]);
 }
 
 public isActive(page: string): boolean {
   return this.router.isActive(page, {paths: 'exact', queryParams: 'exact', fragment: 'ignored', matrixParams: 'ignored'});
 }
}
