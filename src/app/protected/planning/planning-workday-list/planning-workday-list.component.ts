import { Component } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Workday } from '../planning-workday-item/planning-workday-item.component';

@Component({
  selector: 'al-planning-workday-list',
  templateUrl: './planning-workday-list.component.html',
  styles: [
  ]
})
export class PlanningWorkdayListComponent {
  workdays$: Observable<Workday[]>;
  workdays: Workday[];

  constructor() { }
  
  ngOnInit() {
    this.workdays = [
      { dueDate: 'Lundi', doneTasks: 1, remainingTasks: 3 },
      { dueDate: 'Mardi', doneTasks: 0, remainingTasks: 2 },
      { dueDate: 'Mercredi', doneTasks: 0, remainingTasks: 1 }
    ];
    //Simulation d'un appel à la base de données de 1000ms
    this.workdays$ = of(this.workdays).pipe(delay(1000));
  }

  // Ajoutez notre gestionnaire d’événement :
  onWorkdayRemoved(dueDate: string) {
    this.workdays = this.workdays.filter(workday => 
    !dueDate.includes(workday.dueDate)
    );
    this.workdays$ = of(this.workdays);
  }
}
