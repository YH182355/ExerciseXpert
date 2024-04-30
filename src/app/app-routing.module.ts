import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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

const routes: Routes = [
  {path:"Login", component:LoginComponent},
  {path:"index", component:indexC},
  {path:"navbar", component:NavbarC},
  {path: "Registro", component:RegistroC},
  {path: "Foooter", component:FooterC},
  {path: "Calculadora", component:CalculadoraC},
  {path: "rutina", component:rutinaComponent},
  {path: "perfil", component:PerfilComponent},
  {path: "ejercicio", component:EjercicioCo},
  {path: "new", component:NewRutinaCo},
  {path: '**', redirectTo: '/index'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
