import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, where } from '@angular/fire/firestore';
import {Usuario, UsuarioRutinas, Rutina} from './../BD/BD';
import { collection, query, collectionData, updateDoc } from '@angular/fire/firestore';
import { EjercicioCo } from '../Ejercicio/ejercicio';
import Swal from 'sweetalert2';
import { doc, deleteDoc } from 'firebase/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';


@Component({
  selector: 'rutina',
  templateUrl: './rutina.html',
  styleUrls: ['./rutina.css'],
})

export class rutinaComponent implements OnInit {

  


  public PesaRusa: boolean = false;
  public Estiramientos: boolean = false;
  public PesoCorporal: boolean = false;
  public Barra: boolean = false;
  public Mancuernas: boolean = false;
  public Cables: boolean = false;
  public Banda: boolean = false;
  public Plate: boolean = false;
  public TRX: boolean = false;
  public Yoga: boolean = false;
  
  gender: string = '';
  difficulty: string = '';

  Usuario = new Usuario();
  Rutinas = new Rutina();
  CardsRutinas: Rutina[] = new Array();
  UsuarioCards: UsuarioRutinas[] = new Array();
  rut: boolean = false;
  difi: boolean = true;
  active:string="todos"
  RutinaUsuario : UsuarioRutinas = new UsuarioRutinas();


  ngOnInit() {
    this.TodasRutinas();
    console.log(this.Usuario.IdUsuario)
    console.log(this.RutinaUsuario)

  }
    
  constructor(private EjercicioCo: EjercicioCo,private firstore: Firestore, public router:Router, public storage: Storage){

    if(history.state.IdUsuario == "" || history.state.IdUsuario == undefined){
      
    }
    else{
      localStorage.setItem('User', JSON.stringify(history.state));
    }
    this.Usuario = new Usuario();
    this.Usuario = JSON.parse(localStorage.getItem('User')!);
     console.log(this.Usuario);
  }
  
  RutinasDificultad(dificultad: string){
    const D = collection(this.firstore, "Rutina");
    const Z = query(D, where("Dificultad", "==", dificultad));
    collectionData(Z).subscribe((ssRutinas) => {
      this.CardsRutinas = new Array();
      if (ssRutinas.length > 0) {
        ssRutinas.forEach((item:any) => {
          let Rutinaas = new Rutina;
          Rutinaas.setData(item);
          this.CardsRutinas.push(Rutinaas);
        })
        
      }

    })
    }
    
    RutinasEquipo(Equipo: string){
      this.difi = true
      this.rut = false;
      this.active = Equipo;
      console.log(Equipo)
      const E = collection(this.firstore, "Rutina");
      const O = query(E, where("Equipo", "==", Equipo));
      
      collectionData(O).subscribe((ssRutinasE) => {
        this.CardsRutinas = new Array();
        if (ssRutinasE.length > 0) {
          ssRutinasE.forEach((item:any) => {
            let Rutinaas = new Rutina;
            Rutinaas.setData(item);
            this.CardsRutinas.push(Rutinaas);
          })
          
        }
  
      })
      }


      async borrar(card: UsuarioRutinas) {
        const index = this.UsuarioCards.indexOf(card);
        if (index >= 0) {
          const result = await Swal.fire({
            icon: 'warning',
            title: '¿Estás seguro?',
            text: '¿Quieres borrar esta card?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, borrar',
            cancelButtonText: 'Cancelar',
          });
      
          if (result.isConfirmed) {
            const docRef = doc(this.firstore, 'RutinasUsuario', card.IdRutina);
            await deleteDoc(docRef);
            this.UsuarioCards.splice(index, 1);
          }
        }
      }

      UsuarioRutinas(){
        this.active = 'Mis Rutinas';
        this.difi = false;
        this.rut = true;
        
          const E = collection(this.firstore, "RutinasUsuario");
          const z = query(E, where("IdUsuario", "==", this.Usuario.IdUsuario));
          
          collectionData(z).subscribe((ssAllRutinas) => {
            this.UsuarioCards = new Array();
            if (ssAllRutinas.length > 0) {
              ssAllRutinas.forEach((item: any) => {
                let Rutinaas = new UsuarioRutinas();
                Rutinaas.setData(item);
                this.UsuarioCards.push(Rutinaas);
                console.log(Rutinaas)
              });
            }
          });

        
        
        }

      TodasRutinas(){
        this.active = 'Todos';
        this.difi = true
        this.rut = false;
        const E = collection(this.firstore, "Rutina");
        collectionData(E).subscribe((ssAllRutinas) => {
          this.CardsRutinas = new Array();
          if (ssAllRutinas.length > 0) {
            ssAllRutinas.forEach((item:any) => {
              let Rutinaas = new Rutina;
              Rutinaas.setData(item);
              this.CardsRutinas.push(Rutinaas);
            })
            
          }
    
        })
        }
        
 



  clickRutina(rutina: Rutina){
    let Parametros: any[] = new Array();
    Parametros.push(this.Usuario);
    Parametros.push(rutina);
    this.router.navigate(['/ejercicio'], {state: Parametros});
    console.log({state: rutina});
  }

  abrir(rutina: UsuarioRutinas) {
    this.RutinaUsuario = JSON.parse(JSON.stringify(rutina));
  }

  editar() {
    const a = doc(this.firstore, 'RutinasUsuario', this.RutinaUsuario.IdRutina);
    updateDoc(a, { 
      Nombre: this.RutinaUsuario.Nombre, 
      Dificultad: this.RutinaUsuario.Dificultad,
      Objetivo: this.RutinaUsuario.Objetivo,
      Series: this.RutinaUsuario.Series,
      UrlImagen: this.RutinaUsuario.UrlImagen
    });
  
   
  }
  
  handleImageUpload(img: any) {
    const A = img.target.files[0];
    if (A) {
      const B = ref(this.storage, 'routine-images/' + A.name); 
      const C = uploadBytes(B, A);      
      C.then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          this.RutinaUsuario.UrlImagen = downloadURL;
        }).catch((error) => {
          console.error('Error getting download URL:', error);
        });
      }).catch((error) => {
        console.error('Error uploading image:', error);
      });
    }
  }

}
