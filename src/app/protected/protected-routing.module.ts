import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProtectedComponent } from './protected.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { RoleGuard } from '../core/guards/role.guard';

const routes: Routes = [
  {
    path: 'app',
    component: ProtectedComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        title: 'AwesomeList - Dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'parameters',
        title: 'AwesomeList - Parameters',
        loadChildren: () =>
          import('./parameters/parameters.module').then(
            (m) => m.ParametersModule
          ),
        canActivate: [RoleGuard],
      },
      {
        path: 'planning',
        title: 'AwesomeList - Planning',
        loadChildren: () =>
          import('./planning/planning.module').then((m) => m.PlanningModule),
      },
      {
        path: 'profil',
        title: 'AwesomeList - Profil',
        loadChildren: () =>
          import('./profil/profil.module').then((m) => m.ProfilModule),
      },
      {
        path: 'workday',
        title: 'AwesomeList - Workday',
        loadChildren: () =>
          import('./workday/workday.module').then((m) => m.WorkdayModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProtectedRoutingModule {}
