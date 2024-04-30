import { Component,OnInit,Input,ElementRef } from '@angular/core';
import {Usuario} from './../BD/BD';
import { Firestore, where, collectionData } from '@angular/fire/firestore';
import { collection, getDocs, doc, updateDoc, query } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import {Storage,ref,uploadBytesResumable,getDownloadURL} from '@angular/fire/storage';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import * as moment from 'moment';
import { variable } from '@angular/compiler/src/output/output_ast';
import { jsPDF } from 'jspdf';


@Component({
  selector: 'perfil',
  templateUrl: './perfil.html',
  styleUrls: ['./perfil.css']
})

export class PerfilComponent {
  
  events: EventInput[] = [];
  foto: File | null = null;

  @Input() Usuario = new Usuario();

   constructor(private firestore: Firestore, private storage: Storage, public router: ActivatedRoute, public router2:Router, public router3:Router) {
    if(history.state.IdUsuario == "" || history.state.IdUsuario == undefined){
      
    }
    else{
      localStorage.setItem('User', JSON.stringify(history.state));
    }
    this.Usuario = new Usuario();
    this.Usuario = JSON.parse(localStorage.getItem('User')!);
    this.verDatos();
    //console.log(this.Usuario);

  }
  

  ngOnInit(): void {
    

    const datosRegistroRutinas = collection(this.firestore, 'RegistroRutinas');
    const z = query(datosRegistroRutinas, where('usuario', '==', this.Usuario.User));
    getDocs(z).then((querySnapshot) => {
      const eventos: EventInput[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();  

        const evento: EventInput = {
          title: data.Informacion,
          start: new Date(data.Fecha.seconds * 1000) 
        };

        eventos.push(evento);
      });

      this.calendarOptions.events = eventos;
    });
  }


  //#region Esto no hace nimaiz
  async getRegistroRutinas() {
    const DatosRegistroRutinas = collection(this.firestore, 'RegistroRutinas');
    const querySnapshot = await getDocs(DatosRegistroRutinas);
  
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const fechaFormateada = moment(data.Fecha, 'DD [de] MMMM [de] YYYY, HH:mm:ss [UTC]Z').toDate();
      const evento: EventInput = {
        title: data.Informacion,
        start: fechaFormateada,
      };
      this.events.push(evento);
    });
  }

  //#endregion




  
  //  verDatos() {
  //   const DatosUsuario = collection(this.firestore, 'Usuario');
  //   getDocs(DatosUsuario).then((querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       const data = doc.data();
  //       this.Usuario.setData(data); 
  //       console.log(this.Usuario);
  //       console.log(data);
  //     }); 
  //   });
  // }

  verDatos(){
    const DatosUsuario = collection(this.firestore, 'Usuario');
    const D = query(DatosUsuario, where("User", "==", this.Usuario));
    collectionData(D).subscribe((ssUsuarios) => {
      if (ssUsuarios.length > 0) {
        this.Usuario.setData(ssUsuarios[0])
        
      }
      else{

      }
    })
    console.log(this.Usuario);
  }
  
  async guardarCambios() {
    const sdf = doc(this.firestore, 'Usuario', this.Usuario.IdUsuario);
    const camposActualizar: any = {
      Nombre: this.Usuario.Nombre,
      User: this.Usuario.User,
      Password: this.Usuario.Password
    };
  
    if (this.foto) {
      const file = this.foto;
      const filePath = `usuarios/foto_${Date.now()}_${file.name}`;
      const storageRef = ref(this.storage, filePath);
  
      try {
        await uploadBytesResumable(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        camposActualizar.FotoUser = downloadURL;
        

      } catch (error) {
        console.error('Error al subir la imagen:', error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error al subir la imagen',
          showConfirmButton: false,
          timer: 1500
        });
        return;
      }
    }
  
    try {
      await updateDoc(sdf, JSON.parse(JSON.stringify(camposActualizar))).then(()=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Los cambios se han guardado',
          showConfirmButton: false,
          timer: 1500
        })
        
      });
      
      
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Error al guardar los cambios',
        showConfirmButton: false,
        timer: 1500
      });
    }
    
  }

  img(event: any) {
    this.foto = event.target.files[0];
  }

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    events: [] as EventInput[]
  };



  PrintCalC(){
    const CALC = document.getElementById('sss');
    const doc = new jsPDF('l', 'pt', 'a4');
    // doc.addFont('../../../assets/ExerciseXpert/Calibri.ttf', 'Calibri', 'normal');


    doc.html(CALC!, {
      html2canvas: {
        scale: .72,
        
      },
      x: 20,
      y: 20,
      callback: function(doc){
        doc.save('Ejemplo.pdf');
      }
    });
  }
 
  

}

