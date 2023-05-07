import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { environment } from '../../../environments/environment';
import { catchError, delay, finalize, switchMap, tap } from 'rxjs/operators';
import { UsersService } from 'src/app/core/services/users.service';
import { ErrorService } from './error.service';
import { LoaderService } from './loader.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(
    null
  );
  readonly user$: Observable<User | null> = this.user.asObservable();

  constructor(
    private http: HttpClient,
    private usersService: UsersService,
    private errorService: ErrorService,
    private loaderService: LoaderService,
    private router: Router
  ) {}

  register(
    name: string,
    email: string,
    password: string
  ): Observable<User | null> {
    const url: string = `${environment.firebaseConfig.auth.baseURL}/signupNewUser?key=
    ${environment.firebaseConfig.apiKey}`;

    const data = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    console.log(data);

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), // Adding header to request
    };

    this.loaderService.setLoading(true);

    return this.http.post<User | null>(url, data, httpOptions).pipe(
      switchMap((data: any) => {
        const jwt: string = data.idToken;
        const user = new User({
          email: data.email,
          id: data.localId,
          name: name,
        });
        // On sauvegarde les informations de connexion de l’utilisateur.
        this.saveAuthData(data.localId, jwt);
        return this.usersService.save(user, jwt);
      }),
      tap((user) => this.user.next(user)),
      tap((_) => this.logoutTimer(3600)),
      catchError((error) => this.errorService.handleError(error)),
      finalize(() => this.loaderService.setLoading(false))
    );
  }

  public login(email: string, password: string): Observable<User | null> {
    const url = `${environment.firebaseConfig.auth.baseURL}/verifyPassword?key=
              ${environment.firebaseConfig.apiKey}`;
    const data = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    this.loaderService.setLoading(true);

    return this.http.post<User>(url, data, httpOptions).pipe(
      switchMap((data: any) => {
        const userId: string = data.localId;
        const jwt: string = data.idToken;
        // On sauvegarde les informations de connexion de l’utilisateur.
        this.saveAuthData(userId, jwt);
        return this.usersService.get(userId, jwt);
      }),
      tap((user) => this.user.next(user)),
      tap((_) => this.logoutTimer(3600)), //déclenchement de la muniterie
      catchError((error) => this.errorService.handleError(error)),
      finalize(() => this.loaderService.setLoading(false))
    );
  }

  // Déconnexion automatique à l'expiration du token
  // Et on ajoute la méthode qui déclenche cette fameuse minuterie :
  private logoutTimer(expirationTime: number): void {
    of(true)
      .pipe(delay(expirationTime * 1000))
      .subscribe((_) => this.logout());
  }

  logout(): void {
    localStorage.removeItem('expirationDate'); // Ajoutez cette ligne,
    localStorage.removeItem('token'); // Et celle-ci aussi,
    localStorage.removeItem('userId'); // Et enfin celle-là !
    this.user.next(null);
    this.router.navigate(['/login']);
  }

  autoLogin(user: User) {
    this.user.next(user);
    this.router.navigate(['app/dashboard']);
  }

  private saveAuthData(userId: string, token: string) {
    const now = new Date();
    const expirationDate = (now.getTime() + 3600 * 1000).toString();
    localStorage.setItem('expirationDate', expirationDate);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
  }
}
