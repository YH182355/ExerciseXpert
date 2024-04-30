import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, where } from '@angular/fire/firestore';
import { collection, query, collectionData } from '@angular/fire/firestore';
import Swal from 'sweetalert2';


import {Usuario} from './../BD/BD'

@Component({
  selector: 'Login',
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  Usuario = new Usuario();
  // NewUser = new Usuario();

  constructor(private firstore: Firestore, public router:Router) { 
    
  }

  // tittle = 'Script-Login'  
  
  Acceder(){
    const usuarios = collection(this.firstore, "Usuario");
    const Q = query(usuarios, where("User", "==", this.Usuario.User), where("Password", "==", this.Usuario.Password));
    if(this.Usuario.User.trim() !== '' || this.Usuario.Password.trim() !== ''){
    collectionData(Q).subscribe((ssUsuarios) => {
      if (ssUsuarios.length > 0) {
        this.Usuario.setData(ssUsuarios[0])
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Has iniciado sesión satisfactoriamente',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/index'], {state: this.Usuario});
        // this.router.navigate([alert('Bienvenido')], {state: this.Usuario});
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Su contraseña es incorrecta',
        })
      }
    })
    }

    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Olvidaste comletar algunos campos!',
        footer: '<a href="">Why do I have this issue?</a>'
      })
    }
    
  }


  
}

