import { NgModule } from '@angular/core';

import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ParametersModule } from './parameters/parameters.module';
import { PlanningModule } from './planning/planning.module';
import { ProfilModule } from './profil/profil.module';
import { WorkdayModule } from './workday/workday.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    ProtectedRoutingModule,
    DashboardModule,
    ParametersModule,
    PlanningModule,
    ProfilModule,
    WorkdayModule
  ]
})
export class ProtectedModule { }
