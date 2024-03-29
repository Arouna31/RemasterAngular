import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  // Protection de la route parente

  canActivate(): Observable<boolean> {
    return this.authService.user$.pipe(
      map((user) => !!user),
      tap((isLogged) => {
        if (!isLogged) {
          this.router.navigate(['/login']);
          return false;
        }

        return true;
      })
    );
  }

  // Protection des routes filles via la protection de la route parente en haut
  canActivateChild(): Observable<boolean> {
    return this.canActivate();
  }
}
