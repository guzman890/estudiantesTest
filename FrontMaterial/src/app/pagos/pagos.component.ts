import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../services/persona.service';
import { MatDialog } from '@angular/material/dialog';
import { BuscarEstudianteComponent } from './buscar-estudiante/buscar-estudiante.component';
import { MovimientoService } from '../services/movimiento.service'
import { DetalleCronogramaService } from '../services/detalle-cronograma.service'
import { PagarPensionesComponent } from './pagar-pensiones/pagar-pensiones.component';
@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.scss'],
  providers:[
    PersonaService,
    MovimientoService,
    DetalleCronogramaService
  ]
})
export class PagosComponent implements OnInit {
  
  displayedColumns: string[] = ['Seleccionar', 'Pension', 'Monto', 'estado' ];

  buscar = ""
  personas;
  movimientos
  detalleCronograma

  constructor(
    public dialog: MatDialog,
    private personaService :PersonaService,
    private movimientoService:MovimientoService,
    private detalleCronogramaService:DetalleCronogramaService
  ) { }

  ngOnInit(): void {
    this.personaService.getPersona().subscribe(result =>{
      this.personas = result.data
      console.log(result)
    },
    error=>{
      this.personas = []
    })
    this.consultarDetalleCronograma()
  }

  search(){
    const dialogRef = this.dialog.open(BuscarEstudianteComponent, {
      width: '100vw',
      maxWidth: '100vw',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log(result);
        this.movimientoService.getMovimientoByIdPersona(result.nid_persona).subscribe(
          result=>{
            this.movimientos = result.data
            let flag = true
            this.movimientos.map(x=>{
              let detalle = this.detalleCronograma
                                .find(y=> y.id_detalle_cronograma === x.id_detalle_cronograma)
              x.desc_pension =  detalle.desc_pension
              
              if(x.estado === "1") {
                x.checked = true
                x.hidden = true
              }   
              
              if(x.estado === "0"){
                x.hidden = true
                x.checked = false  
                if(flag){
                  x.hidden = false
                  flag = false
                }           
              }
            })

          },
          error=>{
            console.log(error)
          }
        )
      }
      else
        console.log(`Null`);
    });
  }
  consultarDetalleCronograma(){
    this.detalleCronogramaService.getDetalleCronogramaByIdCronograma(2).subscribe(
      result=>{
        this.detalleCronograma = result.data
      },
      error=>{
        console.log("Error")
      }
    )
  }
  setElemento(element){
    

    if(element === null)
    {
      this.movimientos[0].hidden = false
      return
    }

    let saveindex = -1
    for(let i = 0; i<this.movimientos.length ;i++){
      if(this.movimientos[i].id_movimiento === element.id_movimiento){
        saveindex= i
        break;
      }
      
    }

    if(saveindex === this.movimientos.length-1 ){
      return
    }

    if(saveindex >= 0 ){
      this.movimientos[saveindex+1].hidden = false
    }

    
  }

  pagar(){
    let pagar = []
    let total = 0
    this.movimientos.map(x=>{
      if(x.estado==="0" && x.checked){
        total+=x.monto
        x.estado="1"
        pagar.push(x)
      }
    })

    const dialogRef = this.dialog.open(PagarPensionesComponent, {
      data: {
        "lista" : pagar,
        "total" : total
      },
      width: '100vw',
      maxWidth: '100vw',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)  
      if(result)
        this.search()
    });
  }
}
