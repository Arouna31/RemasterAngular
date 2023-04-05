import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { Toastr } from 'src/app/shared/models/toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastrService {
  private toastr: BehaviorSubject<Toastr | null> =
    new BehaviorSubject<Toastr | null>({
      category: 'info',
      message: 'Fermer moi',
    });
  readonly toastr$: Observable<Toastr | null> = this.toastr.asObservable();

  constructor() {}

  showToastr(toastr: Toastr): void {
    timer(0, 3000) // emet un flux de donné commençant par zero et incrementé chaque 3s
      .pipe(take(2)) // s'arrêter dès que la deuxième valeur est donnée
      .subscribe((i) => {
        if (i === 0) {
          this.toastr.next(toastr); // affichage du toast
        } else {
          this.toastr.next(null); // disparition du toast après 3s
        }
      });
  }

  closeToastr(): void {
    this.toastr.next(null);
  }
}
