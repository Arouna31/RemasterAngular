import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Workday } from 'src/app/shared/models/workday';

@Component({
  selector: 'al-planning-workday-item',
  templateUrl: './planning-workday-item.component.html',
  styles: [],
})
export class PlanningWorkdayItemComponent {
  @Input() workday: Workday;
  @Output() workdayRemoved = new EventEmitter<Workday>();

  constructor(private router: Router) {}

  ngOnInit() {}

  removeWorkday(workday: Workday) {
    this.workdayRemoved.emit(workday); // dueDate devient workday !
  }

  goWorkday(workday: Workday) {
    this.router.navigate(['app/workday'], {
      queryParams: {
        date: workday.dueDate,
      },
    });
  }
}
