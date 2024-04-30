import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';
import {Usuario} from './../BD/BD';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'Calculadora',
  templateUrl: './calculadora.html',
  styleUrls: ['./calculadora.css'],
  
})
export class CalculadoraC {

  Usuario = new Usuario();
    
  constructor(private firstore: Firestore, public router:Router){

    if(history.state.IdUsuario == "" || history.state.IdUsuario == undefined){
      
    }
    else{
      localStorage.setItem('User', JSON.stringify(history.state));
    }
    this.Usuario = new Usuario();
    this.Usuario = JSON.parse(localStorage.getItem('User')!);
    // console.log(this.Usuario);
  }

  //#region VARIABLES ------------------------------------------------

  Edad: number = 18;
  unitSystem: string = 'metric';
  gender: string = 'male';
  height: number = 150;
  weight: number = 100;
  selectedTextId: string = 'text1';
  selectedTextId1: string = '2text5';
  result:number = 0;

  //#endregion



  //#region CALCULADORAAAAAA 
  estatura(): string {
    if (this.unitSystem === 'metric') {
      return this.height.toString();
    } else if (this.unitSystem === 'imperial') {
      const feet = Math.floor(this.height / 12);
      const inches = this.height % 12;
      return `${feet}'  ${inches}"`;
    }
    return '';
  }
  
  libras(): string {
    if (this.unitSystem === 'metric') {
      return this.height.toString();
    } else if (this.unitSystem === 'imperial') {
      const libras = Math.floor(this.weight * 2.2046);
      return `${libras}`;
    }
    return '';
  }

  Calorias(): any{
    if((this.unitSystem === 'metric' || this.unitSystem === 'imperial') && this.selectedTextId === 'text1'){
      if(this.gender === 'male'){
        this.result = (88.362 + (13.397 * this.weight) + (4.799 * this.height) - (5.677 * this.Edad));
        this.result = Math.round(this.result * 1.2);
        this.GainOrLose();
        return this.result;
      }
      else{
        this.result = (447.593 + (9.247 * this.weight) + (3.098 * this.height) - (4.330 * this.Edad));
        this.result = Math.round(this.result * 1.2);
        this.GainOrLose();
        return this.result;
      }
    }

    else if((this.unitSystem === 'metric' || this.unitSystem === 'imperial') && this.selectedTextId === 'text2'){
      if(this.gender === 'male'){
        this.result = (88.362 + (13.397 * this.weight) + (4.799 * this.height) - (5.677 * this.Edad));
        this.result = Math.round(this.result * 1.375);
        this.GainOrLose();
        return this.result;
      }
      else{
        this.result = (447.593 + (9.247 * this.weight) + (3.098 * this.height) - (4.330 * this.Edad));
        this.result = Math.round(this.result * 1.375);
        this.GainOrLose();
        return this.result;
      }
    }

    else if((this.unitSystem === 'metric' || this.unitSystem === 'imperial') && this.selectedTextId === 'text3'){
      if(this.gender === 'male'){
        this.result = (88.362 + (13.397 * this.weight) + (4.799 * this.height) - (5.677 * this.Edad));
        this.result = Math.round(this.result * 1.55);
        this.GainOrLose();
        return this.result;
      }
      else{
        this.result = (447.593 + (9.247 * this.weight) + (3.098 * this.height) - (4.330 * this.Edad));
        this.result = Math.round(this.result * 1.55);
        this.GainOrLose();
        return this.result;
      }
    }
    
    else if((this.unitSystem === 'metric' || this.unitSystem === 'imperial') && this.selectedTextId === 'text4'){
      if(this.gender === 'male'){
        this.result = (88.362 + (13.397 * this.weight) + (4.799 * this.height) - (5.677 * this.Edad));
        this.result = Math.round(this.result * 1.725);
        this.GainOrLose();
        return this.result;
      }
      else{
        this.result = (447.593 + (9.247 * this.weight) + (3.098 * this.height) - (4.330 * this.Edad));
        this.result = Math.round(this.result * 1.725);
        this.GainOrLose();
        return this.result;
      }
    }

    else if((this.unitSystem === 'metric' || this.unitSystem === 'imperial') && this.selectedTextId === 'text5'){
      if(this.gender === 'male'){
        this.result = (88.362 + (13.397 * this.weight) + (4.799 * this.height) - (5.677 * this.Edad));
        this.result = Math.round(this.result * 1.9);
        this.GainOrLose();
        return this.result;
      }
      else{
        this.result = (447.593 + (9.247 * this.weight) + (3.098 * this.height) - (4.330 * this.Edad));
        this.result = Math.round(this.result * 1.9);
        this.GainOrLose();
        return this.result;
      }
    }

  }
  
  GainOrLose(): any{
      if(this.selectedTextId1 === '2text1'){
        this.result = this.result - 1100;
        return this.result;
      }
      else if(this.selectedTextId1 === '2text2'){
        this.result = this.result - 825;
        return this.result;
      }
      else if(this.selectedTextId1 === '2text3'){
        this.result = this.result - 550;
        return this.result;
      }
      else if(this.selectedTextId1 === '2text4'){
        this.result = this.result - 275;
        return this.result;
      }
      else if(this.selectedTextId1 === '2text5'){
        return this.result;
      }
      else if(this.selectedTextId1 === '2text6'){
        this.result = this.result + 275;
        return this.result;
      }
      else if(this.selectedTextId1 === '2text7'){
        this.result = this.result + 550;
        return this.result;
      }
      else if(this.selectedTextId1 === '2text8'){
        this.result = this.result + 825;
        return this.result;
      }
      else if(this.selectedTextId1 === '2text9'){
        this.result = this.result + 1100;
        return this.result;
      }
  }

  //#endregion
  
  
  PrintCalC(){
    const CALC = document.getElementById('CalculadoraContainer');
    const doc = new jsPDF('l', 'pt', 'a3');
    doc.addFont('../../../assets/ExerciseXpert/Calibri.ttf', 'Calibri', 'normal');


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

  Caloriaas(){
    this.Calorias();
    this.PrintCalC();
  }
}


