import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GradoService } from 'src/app/services/grado.service';
import { PersonaService } from 'src/app/services/persona.service';
import { DetalleCronogramaService } from 'src/app/services/detalle-cronograma.service';
import { NivelService } from 'src/app/services/nivel.service';
import { MovimientoService } from 'src/app/services/movimiento.service';

@Component({
  selector: 'app-registrar-estudiante',
  templateUrl: './registrar-estudiante.component.html',
  styleUrls: ['./registrar-estudiante.component.scss'],
  providers:[
    GradoService,
    PersonaService,
    DetalleCronogramaService,
    NivelService,
    MovimientoService
  ]
})
export class RegistrarEstudianteComponent implements OnInit {

  //get Data
  grados
  detalleCronograma
  persona
  nivel
  precio

  // ngModel
  edad
  foto_ruta
  fecha_naci
  nid_grado
  ape_mate_pers
  ape_pate_pers
  nom_persona

  constructor(
    public gradoService:GradoService,
    public personaService:PersonaService,
    public detalleCronogramaService:DetalleCronogramaService,
    public nivelService:NivelService,
    public movimientoService:MovimientoService,
    public dialogRef: MatDialogRef<RegistrarEstudianteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.gradoService.getGrado().subscribe(result=>{
      this.grados=result.data
    },
    error=>{

    })
  }

  guardarEstudiante(){
    let estudiante =
      {
        "nid_persona":0,
        "nom_persona":this.nom_persona,
        "ape_pate_pers":this.ape_pate_pers,
        "ape_mate_pers":this.ape_mate_pers,
        "nid_grado":this.nid_grado,
        "fecha_naci":this.fecha_naci,
        "foto_ruta":this.foto_ruta
      }
    this.getPrecio()
    this.personaService.postPersona(estudiante).subscribe(
      result=>{
        console.log(result)
        estudiante.nid_persona = result.data[0].nid_persona
        this.persona = estudiante
        this.createMovimientos()
      },
      error=>{
        console.log(error)
      })
  }
  getPrecio(){
    let gradoActual = this.grados.find(x => x.nid_grado === this.nid_grado )
    console.log(gradoActual.nivel)
    this.nivelService.getNivelById(gradoActual.nivel).subscribe(
      result=>{
        this.nivel = result.data[0]
        this.precio = this.nivel.precio
      },
      error=>{
        console.log("Error")
      }
    )
  }
  createMovimientos(){
    this.detalleCronogramaService.getDetalleCronogramaByIdCronograma(2).subscribe(
      result=>{
        this.detalleCronograma = result.data
        this.fomarMovimientos()
      },
      error=>{
        console.log("Error")
      }
    )
  }

  fomarMovimientos(){
    let arrayMovimeintos = []

    this.detalleCronograma.map(x=>{
      arrayMovimeintos.push(
        {
          "tipo_movimiento"       : "INGRESO",
          "monto"                 : this.precio,
          "estado"                : 0,
          "fecha_pago"            : x.fecha_venci,
          "id_persona"            : this.persona.nid_persona,
          "id_detalle_cronograma" : x.id_detalle_cronograma
        }
      )
    })

    this.movimientoService.createMovimientos(arrayMovimeintos).subscribe(
      result=>{
        this.detalleCronograma = result.data
        console.log(result.data)
        this.dialogRef.close(true);
      },
      error=>{
        console.log(error)
      })

  }

  calcularEdad() {
    var hoy = new Date();
    var cumpleanos = new Date(this.fecha_naci);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }

    this.edad= edad;
  }
}
