import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { PlanningComponent } from './planning/planning.component';
import { PlanningWorkdayListComponent } from './planning-workday-list/planning-workday-list.component';
import { PlanningWorkdayItemComponent } from './planning-workday-item/planning-workday-item.component';
import { ParametersRoutingModule } from '../parameters/parameters-routing.module';



@NgModule({
  declarations: [
    PlanningComponent,
    PlanningWorkdayListComponent,
    PlanningWorkdayItemComponent
  ],
  imports: [
    SharedModule,
    ParametersRoutingModule
  ]
})
export class PlanningModule { }
