import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ChatComponent } from './components/chat/chat.component';
import { ClassesComponent } from './components/classes/classes.component';
import { ClassroomsComponent } from './components/classrooms/classrooms.component';
import { ManagersComponent } from './components/managers/managers.component';
import { StudentsComponent } from './components/students/student.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { SystemNavigationComponent } from './components/system-navigation/system-navigation.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { TimetableComponent } from './components/timetable/timetable.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
  // { path: "", redirectTo: "system", pathMatch: "full" },
  {path:"login", component: LoginComponent},
  {path:"signup", component: SignupComponent},
  // {path:'', component: SystemNavigationComponent},
  {path:'system', component: SystemNavigationComponent, children: [
    { path: 'system', redirectTo: 'welcome', pathMatch: 'full' },
    {path: 'welcome', component: WelcomeComponent},
    {path: 'student', component: StudentsComponent},
    {path: 'teacher', component: TeachersComponent},
    {path: 'subject', component: SubjectsComponent},
    {path: 'class', component: ClassesComponent},
    {path: 'classroom', component: ClassroomsComponent},
    {path: 'timetable', component: TimetableComponent},
    {path: 'chat', component: ChatComponent},
    {path: 'videoChat', component: ChatComponent},
    {path: 'manager', component: ManagersComponent},
  ], canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
