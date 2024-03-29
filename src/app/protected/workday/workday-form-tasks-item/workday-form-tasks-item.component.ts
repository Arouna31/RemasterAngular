import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'al-workday-form-tasks-item',
  templateUrl: './workday-form-tasks-item.component.html',
  styleUrls: ['./workday-form-tasks-item.component.scss'],
})
export class WorkdayFormTasksItemComponent {
  @Input() task: FormGroup;
  @Input() index: number;
  @Input() isFirst: boolean;
  @Input() isLast: boolean;
  @Output() removedTask = new EventEmitter<number>();

  removeTask(index: number) {
    this.removedTask.emit(index);
  }

  selectTodo(todo: number) {
    this.task.patchValue({ todo: todo });
  }
}
