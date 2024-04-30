import { Component, OnInit } from '@angular/core';
import { NavbarC } from '../Navbar/navbar';
import { Router } from '@angular/router';
import { Firestore, where } from '@angular/fire/firestore';
import {Ejercicio, Usuario} from './../BD/BD';
import { collection, query, collectionData } from '@angular/fire/firestore';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';



declare const bootstrap: any;


@Component({
  selector: 'index',
  templateUrl: './index.html',
  styleUrls: ['./index.css']
})

export class indexC{

  Usuario = new Usuario();
  EjercicioModal = new Ejercicio();
  videoUrl!: SafeResourceUrl;
  // videoUrl: SafeResourceUrl | undefined;
  videoUrls: SafeResourceUrl[] = [];

  Modales: Ejercicio[] = new Array();
  

    
  constructor(private firstore: Firestore, public router:Router, private sanitizer: DomSanitizer){

    
    if(history.state.IdUsuario == "" || history.state.IdUsuario == undefined){
      
    }
    else{
      localStorage.setItem('User', JSON.stringify(history.state));
    }
    this.Usuario = new Usuario();
    this.Usuario = JSON.parse(localStorage.getItem('User')!);
    // console.log(this.Usuario);
  }
  

  //#region Modal


  openModal() {
    const modal = new bootstrap.Modal(document.getElementById('ModalMusculo'));
    modal.show();
  }
  //#endregion
  
  //#region Cambio de mono

    Genero(){
      var male = document.getElementById('male-body-maps') as HTMLElement;
      var female = document.getElementById('female-body-maps') as HTMLElement;
      // var check = document.getElementById('flexRadioDefault1') as HTMLHtmlElement;
      // if(check.ariaChecked){

      // }
      // else{
      //   male.style.display = 'none';
      //   female.style.display = 'flex';
      // }
      male.style.display = 'none';
      female.style.display = 'flex';
    }
    Genero2(){
      var male = document.getElementById('male-body-maps') as HTMLElement;
      var female = document.getElementById('female-body-maps') as HTMLElement;
      // var check = document.getElementById('flexRadioDefault1') as HTMLHtmlElement;
      // if(check.ariaChecked){

      // }
      // else{
      //   male.style.display = 'none';
      //   female.style.display = 'flex';
      // }
      male.style.display = 'flex';
      female.style.display = 'none';
    }
    //#endregion

    

   
    // BuscarEjercicio(musculo: string){
    // const x = collection(this.firstore, "Ejercicio");
    // const Q = query(x, where("Musculo", "==", musculo));
    // collectionData(Q).subscribe((ssUsuarios) => {
    //   if (ssUsuarios.length > 0) {
    //     this.EjercicioModal.setData(ssUsuarios[0])
    //     this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.EjercicioModal.UrlVideo);
    //     console.log(this.EjercicioModal.UrlVideo);
    //     console.log(this.videoUrl);
    //     this.openModal();
    //   }
    //   else{
        
    //   }
    // })
    // }

    BuscarEjercicio(musculo: string){
      const x = collection(this.firstore, "Ejercicio");
      const Q = query(x, where("Musculo", "==", musculo));
      
      collectionData(Q).subscribe((ssUsuarios) => {
        this.Modales = new Array();
        if (ssUsuarios.length > 0) {
          console.log(ssUsuarios)
                    
          ssUsuarios.forEach((item:any) => {
            
            let Modaless = new Ejercicio;
            Modaless.setData(item);
            Modaless.videoSanitizado = this.sanitizer.bypassSecurityTrustResourceUrl(item.UrlVideo);
            
            this.Modales.push(Modaless);
            this.openModal();
          })
          
        }
        else{
          
        }
      })
      }

      
    

}
