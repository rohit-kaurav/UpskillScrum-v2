import { IterationInfoComponent } from './../iterations/iteration-info/iteration-info.component';
import { BacklogInfoComponent } from './../backlogs/backlog-info/backlog-info.component';
import { MyAccountComponent } from './../my-account/my-account.component';
import { ProjectInfoComponent } from './../projects/project-info/project-info.component';
import { ProjectsComponent } from './../projects/projects.component';
import { LoginGuard } from './../route-guards/login-guard.service';
import { AdminGuard } from './../route-guards/admin-guard.service';
import { AuthGuard } from './../route-guards/auth-guard.service';
import { UsersComponent } from './../admin/users/users.component';
import { DashboardComponent } from './../admin/dashboard/dashboard.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginComponent } from '../forms/login/login.component';
import { NonAdminGuard } from '../route-guards/non-admin-guard.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'admin',
    canActivate: [AuthGuard, AdminGuard],
    children: [
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/admin/dashboard'
      },
    ]
  },
  {
    path: 'project',
    canActivate: [AuthGuard, NonAdminGuard],
    children: [
      {
        path: '',
        component: ProjectsComponent
      },
      {
        path: ':name/backlog/:id',
        component: BacklogInfoComponent
      },
      {
        path: ':name/iteration/:id',
        component: IterationInfoComponent
      },
      {
        path: ':id',
        component: ProjectInfoComponent
      },
    ]
  },
  {
    path: 'my-account',
    component: MyAccountComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/admin/dashboard'
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class RoutesModule { }