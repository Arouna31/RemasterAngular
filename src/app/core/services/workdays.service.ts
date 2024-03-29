import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // On importe le client Http d'Angular.
import { Workday } from 'src/app/shared/models/workday'; // On importe notre modèle métier Workday.
import { environment } from 'src/environments/environment';
import { Task } from 'src/app/shared/models/task';
import { ToastrService } from './toastr.service';
import { ErrorService } from './error.service';
import { LoaderService } from './loader.service';
import { tap, catchError, finalize, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkdaysService {
  constructor(
    private http: HttpClient,
    private toastrService: ToastrService,
    private errorService: ErrorService,
    private loaderService: LoaderService
  ) {}

  save(workday: Workday) {
    const url = `${environment.firebaseConfig.firestore.baseURL}/workdays?key=${environment.firebaseConfig.apiKey}`;
    const data = this.getWorkdayForFirestore(workday); // C'est cette ligne qui est un peu plus costaud que d'habitude...
    const jwt: string = localStorage.getItem('token')!;

    return this.http.post(url, data).pipe(
      tap((_) =>
        this.toastrService.showToastr({
          category: 'success',
          message: 'Votre journée de travail a été enregistrée avec succès.',
        })
      ),
      catchError((error) => this.errorService.handleError(error)),
      finalize(() => this.loaderService.setLoading(false))
    );
  }

  update(workday: Workday) {
    const url = `${environment.firebaseConfig.firestore.baseURL}/workdays/${workday.id}?key=${environment.firebaseConfig.apiKey}&currentDocument.exists=true`;
    const data = this.getWorkdayForFirestore(workday);
    const jwt: string = localStorage.getItem('token')!;

    return this.http.patch(url, data).pipe(
      tap((_) =>
        this.toastrService.showToastr({
          category: 'success',
          message: 'Votre journée de travail a été sauvegardée avec succès.',
        })
      ),
      catchError((error) => this.errorService.handleError(error)),
      finalize(() => this.loaderService.setLoading(false))
    );
  }

  getWorkdayByDate(date: string, userId: string): Observable<Workday | null> {
    const url = `${environment.firebaseConfig.firestore.baseURL}:runQuery?key=${environment.firebaseConfig.apiKey}`;
    const data = this.getSructuredQuery(date, userId);
    const jwt: string = localStorage.getItem('token')!;

    return this.http.post(url, data).pipe(
      switchMap((data: any) => {
        const document = data[0].document;
        if (!document) {
          return of(null);
        }
        return of(this.getWorkdayFromFirestore(document.name, document.fields));
      })
    );
  }

  getWorkdayByUser(userId: string): any {
    const url = `${environment.firebaseConfig.firestore.baseURL}:runQuery?key=${environment.firebaseConfig.apiKey}`;
    const data = this.getWorkdayByUserQuery(userId);
    const jwt: string = localStorage.getItem('token')!;

    return this.http.post(url, data).pipe(
      switchMap((workdaysData: any) => {
        const workdays: Workday[] = [];
        workdaysData.forEach((data: any) => {
          if (data && data.document) {
            const workday: Workday = this.getWorkdayFromFirestore(
              data.document.name,
              data.document.fields
            );
            workdays.push(workday);
          }
        });
        return of(workdays);
      }),
      catchError((error) => this.errorService.handleError(error))
    );
  }

  remove(workday: Workday) {
    const url = `${environment.firebaseConfig.firestore.baseURL}/workdays/${workday.id}?key=${environment.firebaseConfig.apiKey}`;
    const jwt: string = localStorage.getItem('token')!;

    return this.http.delete(url).pipe(
      tap((_) =>
        this.toastrService.showToastr({
          category: 'success',
          message: 'Votre journée de travail a été supprimé avec succès.',
        })
      ),
      catchError((error) => this.errorService.handleError(error)),
      finalize(() => this.loaderService.setLoading(false))
    );
  }

  // Pousser le modèle métier d'une journée de travail au Firestore.
  private getWorkdayForFirestore(workday: Workday): any {
    if (typeof workday.dueDate === 'string') {
      workday.dueDate = +workday.dueDate;
    }
    const date: number = new Date(workday.dueDate).getTime();
    const tasks: Object = this.getTaskListForFirestore(workday.tasks);

    return {
      fields: {
        dueDate: { integerValue: date },
        tasks: tasks,
        notes: { stringValue: workday.notes },
        userId: { stringValue: workday.userId },
      },
    };
  }

  // Mise en place de la liste des tâches d'une journée de travail, pour le Firestore.
  private getTaskListForFirestore(tasks: Task[]): any {
    const taskList: any = {
      arrayValue: {
        values: [],
      },
    };

    tasks.forEach((task) =>
      taskList.arrayValue.values.push(this.getTaskForFirestore(task))
    );

    return taskList;
  }

  private getTaskForFirestore(task: Task): any {
    return {
      mapValue: {
        fields: {
          title: { stringValue: task.title },
          todo: { integerValue: task.todo },
          done: { integerValue: task.done },
          completed: { booleanValue: false },
        },
      },
    };
  }

  private getSructuredQuery(date: string, userId: string): any {
    return {
      structuredQuery: {
        from: [
          {
            collectionId: 'workdays',
          },
        ],
        where: {
          compositeFilter: {
            op: 'AND',
            filters: [
              {
                fieldFilter: {
                  field: { fieldPath: 'displayDate' },
                  op: 'EQUAL',
                  value: { stringValue: date },
                },
              },
              {
                fieldFilter: {
                  field: { fieldPath: 'userId' },
                  op: 'EQUAL',
                  value: { stringValue: userId },
                },
              },
            ],
          },
        },
        limit: 1,
      },
    };
  }

  private getWorkdayFromFirestore(name: string, fields: any): Workday {
    const tasks: Task[] = [];
    const workdayId: string = name.split('/')[6];

    fields.tasks.arrayValue.values.forEach((data: any) => {
      const task: Task = new Task({
        completed: data.mapValue.fields.completed.booleanValue,
        done: data.mapValue.fields.done.integerValue,
        title: data.mapValue.fields.title.stringValue,
        todo: data.mapValue.fields.todo.integerValue,
      });
      tasks.push(task);
    });

    return new Workday({
      id: workdayId,
      userId: fields.userId.stringValue,
      notes: fields.notes.stringValue,
      displayDate: fields.displayDate.stringValue,
      dueDate: fields.dueDate.integerValue,
      tasks: tasks,
    });
  }

  private getWorkdayByUserQuery(userId: string): any {
    return {
      structuredQuery: {
        from: [
          {
            collectionId: 'workdays',
          },
        ],
        where: {
          fieldFilter: {
            field: { fieldPath: 'userId' },
            op: 'EQUAL',
            value: { stringValue: userId },
          },
        },
        orderBy: [
          {
            field: {
              fieldPath: 'dueDate',
            },
            direction: 'DESCENDING',
          },
        ],
      },
    };
  }
}
