import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

export interface Workday {
   dueDate: string;
   doneTasks: number;
   remainingTasks: number;
}

@Component({
  selector: 'al-planning-workday-item',
  templateUrl: './planning-workday-item.component.html',
  styles: [
  ]
})
export class PlanningWorkdayItemComponent implements OnChanges {
   @Input() dueDate: string;
   @Input() doneTasks: number | string;
   @Input() remainingTasks: number | string;
   @Output() workdayRemoved = new EventEmitter<string>;

  ngOnChanges(changes: SimpleChanges) {
  for (const propName in changes) {
   this.update(propName, changes[propName].currentValue);
  }
 }
  
 update(propName: string, propValue: string|number) {
  
  switch (propName) {
   case 'dueDate': {
    if ('Lundi' === propValue) { this.dueDate += ' (Aujourd\'hui)'; }
    break;
   }
   case 'doneTasks': {
    if (0 === propValue) { this.doneTasks = 'Aucune tâche terminé.'; }
    break;
   }
   case 'remainingTasks': {
    if (0 === propValue) { 
     this.remainingTasks = 'Journée de travail terminée !';
    } 
    break;
   }
   default: {
    break;
   }
  }
 }

  removeWorkday(dueDate: string) {
   this.workdayRemoved.emit(dueDate);
  }
  // currentWorkday: Workday;
  // @Input() 
  // set workday(workday: Workday) {
  //   this.currentWorkday = workday || {};
  //   if ('Lundi' === workday.dueDate) {
  //     this.currentWorkday.dueDate += ' (Aujourd\'hui)';
  //   }
  // }

  	
  // get workday() { return this.currentWorkday; } // workday va reprendre la valeur de currentWorkday

}
