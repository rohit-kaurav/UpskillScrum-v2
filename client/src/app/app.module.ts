import { NonAdminGuard } from './route-guards/non-admin-guard.service';
import { AppComponent } from './app.component';
import { SideNavbarComponent } from './common/side-navbar/side-navbar.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UsersComponent } from './admin/users/users.component';
import { UsersTableComponent } from './admin/users/users-table/users-table.component';
import { CapitalizeFirstPipe } from './pipes/capitalize-first.pipe';
import { ProjectFormComponent } from './forms/project-form/project-form.component';
import { BacklogFormComponent } from './forms/backlog-form/backlog-form.component';
import { IterationFormComponent } from './forms/iteration-form/iteration-form.component';
import { UserFormComponent } from './forms/user-form/user-form.component';
import { UserService } from './services/user.service';
import { IterationService } from './services/iteration.service';
import { MyAccountComponent } from './my-account/my-account.component';
import { AdminProjectTableComponent } from './admin/dashboard/admin-project-table/admin-project-table.component';
import { LoginComponent } from './forms/login/login.component';
import { LoginGuard } from './route-guards/login-guard.service';
import { ProjectsComponent } from './projects/projects.component';
import { BacklogsComponent } from './backlogs/backlogs.component';
import { IterationsComponent } from './iterations/iterations.component';
import { ProjectInfoComponent } from './projects/project-info/project-info.component';
import { BacklogInfoComponent } from './backlogs/backlog-info/backlog-info.component';
import { IterationInfoComponent } from './iterations/iteration-info/iteration-info.component';
import { LoadingSpinnerComponent } from './common/loading-spinner/loading-spinner.component';
import { SnackBarComponent } from './common/snack-bar/snack-bar.component';
import { AdminGuard } from './route-guards/admin-guard.service';
import { AuthGuard } from './route-guards/auth-guard.service';
import { BacklogService } from './services/backlog.service';
import { ProjectService } from './services/project.service';
import { DialogBoxComponent } from './common/dialog-box/dialog-box.component';
import { UpdateProjectDialogComponent } from './common/dialogs/projects/update-project-dialog/update-project-dialog.component';
import { ProjectTableComponent } from './projects/project-table/project-table.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ShortbriefPipe } from './pipes/shortbrief.pipe';
import { CreateBacklogDialogComponent } from './common/dialogs/backlogs/create-backlog-dialog/create-backlog-dialog.component';
import { UpdateBacklogDialogComponent } from './common/dialogs/backlogs/update-backlog-dialog/update-backlog-dialog.component';
import { CreateIterationDialogComponent } from './common/dialogs/iterations/create-iteration-dialog/create-iteration-dialog.component';
import { UpdateIterationDialogComponent } from './common/dialogs/iterations/update-iteration-dialog/update-iteration-dialog.component';
import { UpdateUserDialogComponent } from './common/dialogs/users/update-user-dialog/update-user-dialog.component';

import { RoutesModule } from './routes/routes.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdComponentsModule } from './common/md-components/md-components.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    SideNavbarComponent,
    DashboardComponent,
    UsersComponent,
    CapitalizeFirstPipe,
    ProjectFormComponent,
    BacklogFormComponent,
    IterationFormComponent,
    UserFormComponent,
    MyAccountComponent,
    LoginComponent,
    ProjectsComponent,
    BacklogsComponent,
    IterationsComponent,
    ProjectInfoComponent,
    BacklogInfoComponent,
    IterationInfoComponent,
    LoadingSpinnerComponent,
    SnackBarComponent,
    AdminProjectTableComponent,
    UsersTableComponent,
    DialogBoxComponent,
    UpdateProjectDialogComponent,
    ProjectTableComponent,
    NotFoundComponent,
    ShortbriefPipe,
    CreateBacklogDialogComponent,
    UpdateBacklogDialogComponent,
    CreateIterationDialogComponent,
    UpdateIterationDialogComponent,
    UpdateUserDialogComponent,
  ],
  entryComponents: [
    DialogBoxComponent,
    UpdateProjectDialogComponent,
    CreateBacklogDialogComponent,
    UpdateBacklogDialogComponent,
    CreateIterationDialogComponent,
    UpdateIterationDialogComponent,
    UpdateUserDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdComponentsModule,
    RoutesModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
  ],
  providers: [
    UserService,
    ProjectService,
    BacklogService,
    IterationService,

    AuthGuard,
    AdminGuard,
    NonAdminGuard,
    LoginGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
