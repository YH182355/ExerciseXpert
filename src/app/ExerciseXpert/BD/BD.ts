import { S } from "@fullcalendar/core/internal-common";

export class Usuario{
    
    public IdUsuario:string=""       //Id del usuario
    public Password:string=""     //Contraseña
    public User:string=""        //Nombre de la cuenta
    public Nombre:string=""         //Nombre del usuario
    public FotoUser:string=""
    

    setData(data: any){
        this.IdUsuario = data.IdUsuario;
        this.Password = data.Password;
        this.User = data.User;
        this.Nombre = data.Nombre;
        this.FotoUser = data.FotoUser;
    }

}

export class Rutina{
    
    public IdRutina:string=""            // Id de la Rutina
    public Nombre:string=""             // Nombre de la rutina
    public UrlImagen:string=""          // Url de la imagen
    public Dificultad:string=""         // La dificultad del ejercicio
    public Series:string=""            // El numero de series del ejercicio
    public Objetivo:string=""        // El objetivo del ejercicio
    public Equipo: string=""

    Ejercicios: string[] = new Array()

    
    constructor(){}

    setData(data: any){
        this.IdRutina = data.IdRutina;
        this.Nombre = data.Nombre;
        this.UrlImagen = data.UrlImagen;
        this.Dificultad = data.Dificultad;
        this.Series = data.Series;
        this.Objetivo = data.Objetivo;
        this.Equipo = data.Equipo;
        this.Ejercicios = data.Ejercicios;
    }

}

export class Ejercicio{
    
    public IdEjercicio:string=""       //Id del ejercicio
    public NombreEjercicio:string=""    // Nombre del ejercicio
    public Musculo:string=""            // El musculo en que se enfoca
    public Duracion:number=0            // La duración del ejercicio
    public UrlVideo:string=""           // Url del video
    public Dificultad:string=""         // La dificultad del ejercicio
    public Caloria:number=0             // Aproximado de la perdida de calorias

    //visual
    public videoSanitizado: any;

    constructor(){}

    setData(data: any){
        this.IdEjercicio = data.IdEjercicio;
        this.NombreEjercicio = data.NombreEjercicio;
        this.Musculo = data.Musculo;
        this.Duracion = data.Duracion;
        this.UrlVideo = data.UrlVideo;
        this.Dificultad = data.Dificultad;
        this.Caloria = data.Caloria;
    }


}
//Agregar una coleccion de registros de rutinas idregistro, informacionbasica, fecha, dia de la semana,hora
export class RegistroRutinas{
    public IdRegistro:string=""         //Id del Registro
    public Informacion:string=""        // Información Basica (ejercicio o rutina)
    public Dia:string=""            //Dia de la semana del ejercicio
    public Hora:string=""            // Hora en la que se realizo el ejercicio
    public Fecha:Date
    public usuario:any
    
    constructor(){    this.Fecha = new Date()
    }

 

}

export class EjerciciosRutina{
    
    public IdEjercicio:string=""       //Id del ejercicio
    public NombreEjercicio:string=""    // Nombre del ejercicio
    public Musculo:string=""            // El musculo en que se enfoca
    public Duracion:number=0            // La duración del ejercicio
    public UrlVideo:string=""           // Url del video
    public Dificultad:string=""         // La dificultad del ejercicio
    public Caloria:number=0             // Aproximado de la perdida de calorias
    public Series:string="" 

    //visual
    public videoSanitizado: any;

    constructor(){}

    setData(data: any){
        this.IdEjercicio = data.IdEjercicio;
        this.NombreEjercicio = data.NombreEjercicio;
        this.Musculo = data.Musculo;
        this.Duracion = data.Duracion;
        this.UrlVideo = data.UrlVideo;
        this.Dificultad = data.Dificultad;
        this.Caloria = data.Caloria;
        this.Series = data.Series;
    }

    


}

export class UsuarioRutinas{
    
    public IdRutina:string=""            // Id de la Rutina
    public Nombre:string=""             // Nombre de la rutina
    public UrlImagen:string=""          // Url de la imagen
    public Dificultad:string=""         // La dificultad del ejercicio
    public Series:string=""            // El numero de series del ejercicio
    public Objetivo:string=""        // El objetivo del ejercicio
    public Equipos:string[] = []
    public IdUsuario: string = ""; 
    public Ejercicios:string[]= []
    public EjerciciosPorEquipo: { [equipo: string]: { [ejercicio: string]: string } } = {};

    
    
    constructor(){}

    setData(data: any){
        this.IdRutina = data.IdRutina;
        this.Nombre = data.Nombre;
        this.UrlImagen = data.UrlImagen;
        this.Dificultad = data.Dificultad;
        this.Series = data.Series;
        this.Objetivo = data.Objetivo;
        this.Equipos = data.Equipos
        this.IdUsuario = data.IdUsuario;
        this.Ejercicios = data.Ejercicios
        this.EjerciciosPorEquipo = data.EjerciciosPorEquipo

    }

}

