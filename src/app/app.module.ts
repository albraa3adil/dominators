import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StudentsComponent } from './components/students/student.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { ManagersComponent } from './components/managers/managers.component';
import { ClassesComponent } from './components/classes/classes.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { ClassroomsComponent } from './components/classrooms/classrooms.component';
import { TimetableComponent } from './components/timetable/timetable.component';
import { ChatComponent } from './components/chat/chat.component';
import { MaterialModule } from './material.module';
import { SystemNavigationComponent } from './components/system-navigation/system-navigation.component';
// import { AuthService } from './auth/auth.service';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { VideoChatComponent } from './components/video-chat/video-chat.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from '@angular/flex-layout';
import { initializeApp } from "firebase/app";
// import { AngularFireModule } from 'angularfire2';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { AuthService } from './auth/auth.service';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    TeachersComponent,
    ManagersComponent,
    ClassesComponent,
    SubjectsComponent,
    ClassroomsComponent,
    TimetableComponent,
    ChatComponent,
    SystemNavigationComponent,
    WelcomeComponent,
    VideoChatComponent,
    SignupComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule ,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
