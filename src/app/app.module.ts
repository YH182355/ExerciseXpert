import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './ExerciseXpert/Login/login';
import { indexC } from './ExerciseXpert/index/index';
import { NavbarC } from './ExerciseXpert/Navbar/navbar';
import { RegistroC } from './ExerciseXpert/Registro/registro';
import { FooterC } from './ExerciseXpert/Footer/footer';
import { CalculadoraC } from './ExerciseXpert/Calculadora/calculadora';
import { rutinaComponent } from './ExerciseXpert/rutina/rutina';
import { PerfilComponent } from './ExerciseXpert/Perfil/perfil';
import { EjercicioCo } from './ExerciseXpert/Ejercicio/ejercicio';
import { NewRutinaCo } from './ExerciseXpert/new/new';


import { provideStorage } from '@angular/fire/storage';
import { getStorage } from 'firebase/storage';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    indexC,
    NavbarC,
    RegistroC,
    FooterC,
    CalculadoraC,
    rutinaComponent,
    PerfilComponent,
    EjercicioCo,
    NewRutinaCo,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    FormsModule,
    CommonModule,
    FullCalendarModule,
  ],
  providers: [EjercicioCo],
  bootstrap: [AppComponent]
})
export class AppModule { }
