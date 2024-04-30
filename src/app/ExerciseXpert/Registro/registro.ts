import { Component } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { doc, setDoc } from 'firebase/firestore';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Usuario } from '../BD/BD';

@Component({
  selector: 'Registro',
  templateUrl: './registro.html',
  styleUrls: ['./registro.css']
})
export class RegistroC {

  NuevoUsuario : Usuario = new Usuario();
    constructor(private firestore: Firestore, public router:Router){

    }
    Registroo(){

        this.NuevoUsuario.IdUsuario =  "ID-" + this.generateRandomString(10); 
        let rutaDoc = doc(this.firestore, "Usuario",this.NuevoUsuario.IdUsuario)
        if(this.NuevoUsuario.User.trim() !== '' || this.NuevoUsuario.Nombre.trim() !== '' || this.NuevoUsuario.Password.trim() !== ''){
          setDoc(rutaDoc, JSON.parse(JSON.stringify(this.NuevoUsuario))).then(() => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Te has registrado satisfactoriamente',
              showConfirmButton: true,
  
            })
            // this.NuevoUsuario.Nombre = "";
            // this.NuevoUsuario.User = "";
            // this.NuevoUsuario.Password = "";
            this.router.navigate(['/Login'], {state: this.NuevoUsuario});
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

    generateRandomString = (num: number) => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result1 = '';
      const charactersLenght = characters.length;
      for (let i = 0; i < num ; i++){
          result1 += characters.charAt(Math.floor(Math.random() * charactersLenght));
      }
      return result1;
  }
}

