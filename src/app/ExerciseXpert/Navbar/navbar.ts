import { Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../BD/BD';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarC implements OnInit {

  @Input() Usuario = new Usuario();

  constructor(public router: ActivatedRoute, public router2:Router, public router3: Router) { 

    const state = this.router.snapshot?.root?.firstChild?.data?.state;
      if (state && state.Usuario){
        this.Usuario = state.Usuario.Nombre;
      }  
      
  }

  ngOnInit() {

    if (this.router2.url === '/index') {
      // Obtener la etiqueta por su id
    const etiquetaInicio = document.getElementById('Inicio');

    // Cambiar el nombre de clase
    if (etiquetaInicio) {
      etiquetaInicio.className = 'nav-link active';
    }
    }

    if (this.router2.url === '/Calculadora') {
    const etiquetaInicio = document.getElementById('Calculadora');

    if (etiquetaInicio) {
      etiquetaInicio.className = 'nav-link active';
    }
    }

    if (this.router2.url === '/rutina') {
      
    const etiquetaInicio = document.getElementById('Rutinas');

    if (etiquetaInicio) {
      etiquetaInicio.className = 'nav-link active';
    }
    }

    if (this.router2.url === '/perfil') {
      
      const etiquetaInicio = document.getElementById('Perfil');
  
      if (etiquetaInicio) {
        etiquetaInicio.className = 'nav-link active';
      }
    }
    
  }

  CerrarSesion(){
    this.Usuario = new Usuario();
    this.router3.navigate(['/Login']);
  }

  // cambiarClase() {
  //   const elemento = document.getElementById('Calculadora');
  //   if (elemento) {
  //     this.router2.navigate(['/Calculadora']);
  //     elemento.className = 'nav-link active';
  //   }
  // }

  

}

