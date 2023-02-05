import { NgModule } from '@angular/core';

import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ParametersModule } from './parameters/parameters.module';
import { PlanningModule } from './planning/planning.module';
import { ProfilModule } from './profil/profil.module';
import { WorkdayModule } from './workday/workday.module';
import { SharedModule } from '../shared/shared.module';
import { ProtectedComponent } from './protected.component';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';
import { ParametersRoutingModule } from './parameters/parameters-routing.module';
import { PlanningRoutingModule } from './planning/planning-routing.module';
import { ProfilRoutingModule } from './profil/profil-routing.module';
import { WorkdayRoutingModule } from './workday/workday-routing.module';


@NgModule({
  declarations: [
    ProtectedComponent
  ],
  imports: [
    SharedModule,
    ProtectedRoutingModule,
    PlanningRoutingModule,
    DashboardRoutingModule,
    ParametersRoutingModule,
    ProfilRoutingModule,
    WorkdayRoutingModule
  ]
})
export class ProtectedModule { }
