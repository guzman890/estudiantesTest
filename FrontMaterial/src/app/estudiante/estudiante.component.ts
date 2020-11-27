import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../services/persona.service';
import { MatDialog } from '@angular/material/dialog';
import { RegistrarEstudianteComponent } from './registrar-estudiante/registrar-estudiante.component'
import { GradoService } from '../services/grado.service';
@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.scss'],
  providers:[
    PersonaService,
    GradoService
  ]
})
export class EstudianteComponent implements OnInit {

  buscar = ""
  personas;
  grados

  constructor(
    public gradoService:GradoService,
    public dialog: MatDialog,
    private personaService :PersonaService
  ) { }

  ngOnInit(): void {
    this.gradoService.getGrado().subscribe(result=>{
      this.grados=result.data
      console.log(this.grados)
    },
    error=>{

    })
    
    this.cargarPersonas()
  }
  cargarPersonas(){
    this.personaService.getPersona().subscribe(result =>{
      this.personas = result.data
      this.personas.map(x=>{
        x.edad = this.calcularEdad(x.fecha_naci)
        let grado = this.grados.find(y=> y.nid_grado === x.nid_grado )
        x.gradoname = grado.desc_grado
      })
      console.log(result)
    },
    error=>{
      this.personas = []
    })
  }
  search(value){
    console.log(value)
  }
  registrarEstudiante(){
    const dialogRef = this.dialog.open(RegistrarEstudianteComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.cargarPersonas()
      }else{
        console.log("Error");
      }
    });
  }

  calcularEdad(fecha) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }

    return edad;
  }
}
