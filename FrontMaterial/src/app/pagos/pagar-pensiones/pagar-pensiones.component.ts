import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MovimientoService } from 'src/app/services/movimiento.service';

@Component({
  selector: 'app-pagar-pensiones',
  templateUrl: './pagar-pensiones.component.html',
  styleUrls: ['./pagar-pensiones.component.scss'],
  providers:[
    MovimientoService
  ]
})
export class PagarPensionesComponent implements OnInit {

  displayedColumns: string[] = ['Pension','Fecha', 'Monto' ];
  movimientos
  total
  constructor(
    private movimientoService:MovimientoService,

    public dialogRef: MatDialogRef<PagarPensionesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

  ngOnInit(): void {
    this.movimientos = this.data.lista
    this.total = this.data.total
  }

  pagarAhora(){
    this.movimientoService.updateMovimientos(this.movimientos).subscribe(
      result=>{
        console.log(result.data)
        this.dialogRef.close(true)
      },
      error=>{
        console.log(error)
      })
  }
}
