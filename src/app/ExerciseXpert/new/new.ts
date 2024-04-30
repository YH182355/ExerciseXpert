import { Component} from '@angular/core';
import { UsuarioRutinas } from '../BD/BD';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';
import { doc, setDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Usuario } from '../BD/BD';
import { Rutina } from '../BD/BD';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';


@Component({
    selector: 'new',
    templateUrl: './new.html',
    styleUrls: ['./new.css']
  })

  export class NewRutinaCo {

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



    constructor(private firestore: Firestore, public router:Router,public storage:Storage){
      if(history.state.IdUsuario == "" || history.state.IdUsuario == undefined){
      
      }
      else{
        localStorage.setItem('User', JSON.stringify(history.state));
      }
      this.Usuario = new Usuario();
      this.Usuario = JSON.parse(localStorage.getItem('User')!);
      this.RutinaUsuario.EjerciciosPorEquipo = {};
      console.log("Elden Ring")

    }

    sdEquipos: string[] = [];
    Usuario : Usuario = new Usuario();
    Rutina = new Rutina();
    RutinaUsuario : UsuarioRutinas = new UsuarioRutinas();
    ejerciciosDelEquipo: { [equipo: string]: Rutina[] } = {};

    
    mostrarEjercicios(equipo: string) {
      if (this.sdEquipos.includes(equipo)) {
        this.sdEquipos = this.sdEquipos.filter((e) => e !== equipo);
        this.ejerciciosDelEquipo[equipo] = []; 
      } else {
        this.sdEquipos.push(equipo);

        const queryRef = query(
          collection(this.firestore, "Rutina"),
          where('Equipo', '==', equipo)
        );
        getDocs(queryRef)
        .then((querySnapshot) => {
          const ejercicios: Rutina[] = [];
            querySnapshot.forEach((doc) => {
            const data = doc.data() as Rutina;
            ejercicios.push(data);
            });
             this.ejerciciosDelEquipo[equipo] = ejercicios;
             this.RutinaUsuario.EjerciciosPorEquipo[equipo] = {};


         })
         console.log("Elden Ring")
      }
    }
    
   async Registro(){

      if (!this.RutinaUsuario.Nombre || !this.RutinaUsuario.Dificultad || !this.RutinaUsuario.Objetivo || !this.RutinaUsuario.Series) {
        Swal.fire({
          position: 'top',
          icon: 'warning',
          title: 'Completa todos los campos',
          showConfirmButton: false,
          timer: 1200
        });
        return;
      }
      if (
        !this.PesaRusa &&
        !this.Estiramientos &&
        !this.PesoCorporal &&
        !this.Barra &&
        !this.Mancuernas &&
        !this.Cables &&
        !this.Banda &&
        !this.Plate &&
        !this.TRX &&
        !this.Yoga
      ) {
        Swal.fire({
          position: 'top',
          icon: 'warning',
          title: 'Selecciona al menos un equipo',
          showConfirmButton: false,
          timer: 1200
        });
        return;
      }

      let exercisesSelected = false;
      for (const equipo in this.RutinaUsuario.EjerciciosPorEquipo) {
        const ejerciciosPorEquipo = this.RutinaUsuario.EjerciciosPorEquipo[equipo];
        for (const ejercicioItem in ejerciciosPorEquipo) {
          if (ejerciciosPorEquipo[ejercicioItem]) {
            exercisesSelected = true;
            break;
          }
        }
        if (exercisesSelected) {
          break;
        }
      }
    
      if (!exercisesSelected) {
        Swal.fire({
          position: 'top',
          icon: 'warning',
          title: 'Selecciona al menos un ejercicio',
          showConfirmButton: false,
          timer: 1200
        });
        return;
      } 
      
      
      
          if (this.PesaRusa) {
            this.RutinaUsuario.Equipos.push("Pesa Rusa");
          }
          if (this.Estiramientos) {
            this.RutinaUsuario.Equipos.push("Estiramientos");
          }
          if (this.PesoCorporal) {
            this.RutinaUsuario.Equipos.push("Peso Corporal");
          }
          if (this.Barra) {
            this.RutinaUsuario.Equipos.push("Barra");
          } 
          if (this.Mancuernas) {
            this.RutinaUsuario.Equipos.push("Mancuernos");
          } 
          if (this.Cables) {
            this.RutinaUsuario.Equipos.push("Cables");
          }
          if (this.Banda) {
            this.RutinaUsuario.Equipos.push("Bandas Elásticas");
          } 
          if (this.Plate) {
            this.RutinaUsuario.Equipos.push("Plate");
          }
          if (this.TRX) {
            this.RutinaUsuario.Equipos.push("TRX");
          } 
          if (this.Yoga) {
            this.RutinaUsuario.Equipos.push("Yoga");
          }
         
          for (const equipo in this.RutinaUsuario.EjerciciosPorEquipo) {
            const ejerciciosPorEquipo = this.RutinaUsuario.EjerciciosPorEquipo[equipo];
            for (const ejercicioItem in ejerciciosPorEquipo) {
                if (ejerciciosPorEquipo[ejercicioItem]) {
                    this.RutinaUsuario.Ejercicios.push(ejercicioItem);
                }
            }
        }


       const imageInput: HTMLInputElement | null = document.querySelector('#elden'); // Make sure the selector matches your HTML
    if (imageInput && imageInput.files && imageInput.files[0]) {
        const imageFile = imageInput.files[0];
        const randomId = this.generateRandomString(10);
        const filePath = `usuarios/foto_${Date.now()}_${randomId}_${imageFile.name}`;
        const storageRef = ref(this.storage, filePath);

        try {
            await uploadBytesResumable(storageRef, imageFile);
            const downloadURL = await getDownloadURL(storageRef);

            // Assign the download URL to the UrlImagen property
            this.RutinaUsuario.UrlImagen = downloadURL;

            // ... (rest of your code)

        } catch (error) {
            console.error('Error uploading image:', error);
            return;
        }
    }
          
        this.RutinaUsuario.IdUsuario = this.Usuario.IdUsuario ;
        this.RutinaUsuario.IdRutina =  "ID-" + this.generateRandomString(10); 
        let si = doc(this.firestore, "RutinasUsuario",this.RutinaUsuario.IdRutina)
        setDoc(si, JSON.parse(JSON.stringify(this.RutinaUsuario))).then(() => {
          Swal.fire({
              position: 'center',
              icon: 'success',
             title: 'Rutina Creada',
          showConfirmButton: true,
        });
          location.reload();
        });
          
        console.log("Elden Ring")


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