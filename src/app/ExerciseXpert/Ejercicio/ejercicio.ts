import { Component, OnInit} from '@angular/core';
import {EjerciciosRutina, Usuario} from './../BD/BD';
import {Ejercicio} from './../BD/BD';
import { Rutina } from './../BD/BD';
import { NavbarC } from '../Navbar/navbar';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { query, collectionData, where } from '@angular/fire/firestore';
import { Firestore, doc, getDoc, collection, addDoc } from '@angular/fire/firestore';
import { RegistroRutinas } from './../BD/BD';
import Swal from 'sweetalert2';


@Component({
  selector: 'ejercicio',
  templateUrl: './ejercicio.html',
  styleUrls: ['./ejercicio.css']
})

export class EjercicioCo implements OnInit{
    

    ejercicioId:string=""
    hora=0;
    min=0;
    seg=0;
    miliseg=0;
    cron:any;

    RegistroRutinas = new RegistroRutinas();
    Rutina = new Rutina();
    Usuario = new Usuario();
    Ejercicio: any = {};
    videoUrl!: SafeResourceUrl;
    Ejercicios = new EjerciciosRutina();

    rutina = new Rutina();

    numeroEjercicio= 0;
    longitud = 0;
    

    constructor( private sanitizer: DomSanitizer, private router: ActivatedRoute, private firestore: Firestore) {
        if(history.state[0] == "" || history.state[0] == undefined){
          
        }
        else{
          localStorage.setItem('User', JSON.stringify(history.state[0]));
          localStorage.setItem('Rutina', JSON.stringify(history.state[1]));
        }
        this.Usuario = new Usuario();
        this.Usuario = JSON.parse(localStorage.getItem('User')!);
        // console.log(this.Usuario);

        
        this.rutina = JSON.parse(localStorage.getItem('Rutina')!);


        this.longitud = this.rutina.Ejercicios.length;
        // this.rutina.Ejercicios[this.numeroEjercicio]+
      }

       
    
      


      ngOnInit() {
        this.EjerciciosRutinas(this.numeroEjercicio);
      }
      
      

      com(){
        this.pas();
        this.cron= setInterval(() => {this.timer();},10)
      }

      pas(){
        clearInterval(this.cron);
      }

      re(){
        this.hora=0;
        this.min=0;
        this.seg=0;
        this.miliseg=0;
      }

      timer(){
        if((this.miliseg += 10 )== 1000){
          this.miliseg = 0;
          this.seg ++;
        }
        if(this.seg==60){
          this.seg=0;
          this.min++;
        }
        if(this.min==60){
          this.min=0;
          this.hora++;
        }
      }

      rData(input: number): string {
       return input > 10 ? input.toString() : `0${input}`;
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
 
      async Registrar() {
      Swal.fire({
      icon: 'success',
      title: 'Felicidades!',
      text: 'Has Completado tu rutina',
      })
      const duracion = `${this.rData(this.hora)}:${this.rData(this.min)}:${this.rData(this.seg)}`;

      const registro: RegistroRutinas = {
      usuario: this.Usuario.User,
      IdRegistro: this.generateRandomString(10),
      Informacion: this.rutina.Nombre,
      Dia: this.getDíaSemana(),
      Hora: duracion,
      Fecha: new Date()
    };
  
    try {
      const registroRef = await addDoc(collection(this.firestore, 'RegistroRutinas'), registro);
      console.log('Registro exitoso:', registroRef.id);
    } catch (error) {
      console.error('Error al registrar:', error);
    }
  }

 
  getDíaSemana(): string {
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const fecha = new Date();
    const diaSemana = fecha.getDay();
    return diasSemana[diaSemana];
  }


  EjerciciosRutinas(numeroEjercicioo: number){
    numeroEjercicioo = this.numeroEjercicio;
    const x = collection(this.firestore, "EjerciciosRutina");
    const Q = query(x, where("NombreEjercicio", "==", this.rutina.Ejercicios[numeroEjercicioo]));
    collectionData(Q).subscribe((ssUsuarios) => {
      if (ssUsuarios.length > 0) {
        this.Ejercicios.setData(ssUsuarios[0])
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.Ejercicios.UrlVideo);
        console.log(this.Ejercicios.IdEjercicio)
        console.log(this.longitud);
      }
    })
}

  Next(){
    if(this.numeroEjercicio < this.longitud){
      this.numeroEjercicio++;
      
      console.log(this.numeroEjercicio);
      this.EjerciciosRutinas(this.numeroEjercicio);
    }
    else if(this.numeroEjercicio == this.longitud){
      this.Registrar();
    }
  }

  Previus(){
    if(this.numeroEjercicio <= this.longitud){
      this.numeroEjercicio--;
      
      console.log(this.numeroEjercicio);
      this.EjerciciosRutinas(this.numeroEjercicio);
    }
    else{
      
    }
  }




}

