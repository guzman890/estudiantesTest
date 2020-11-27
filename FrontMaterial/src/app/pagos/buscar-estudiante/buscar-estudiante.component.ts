import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/services/persona.service';
import { MatDialogRef } from '@angular/material/dialog';
import { GradoService } from 'src/app/services/grado.service';



export interface tablehead {
  Nombres: string;
  ID: number;
  Grado: string;
  Seleccionar: string;
}

@Component({
  selector: 'app-buscar-estudiante',
  templateUrl: './buscar-estudiante.component.html',
  styleUrls: ['./buscar-estudiante.component.scss'],
  providers:[
    PersonaService,
    GradoService
  ]
})
export class BuscarEstudianteComponent implements OnInit {
  
  displayedColumns: string[] = ['ID', 'Nombres', 'Grado', 'Seleccionar'];
  
  grados
  personas
  seleccionado

  constructor(
    public gradoService:GradoService,
    public dialogRef: MatDialogRef<BuscarEstudianteComponent>,
    private personaService :PersonaService
  ) { }

  ngOnInit(): void {
    this.gradoService.getGrado().subscribe(result=>{
      this.grados=result.data
      this.personaService.getPersona().subscribe(result =>{
        this.personas = result.data
        //console.log(result)
        this.personas.map(x=>{
          let grado = this.grados.find(y=> y.nid_grado === x.nid_grado )
          x.gradoname = grado.desc_grado
        })
      },
      error=>{
        this.personas = []
      })   
    },
    error=>{

    })
    
  }

  seleccionada(element){
    //console.log(element)
    this.seleccionado=element
  }

  buscarMovimientos(){
    this.dialogRef.close(this.seleccionado)
  }
}
