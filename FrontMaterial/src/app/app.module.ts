import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatTabsModule } from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';

import { EstudianteComponent } from './estudiante/estudiante.component';
import { PagosComponent } from './pagos/pagos.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import { RegistrarEstudianteComponent } from './estudiante/registrar-estudiante/registrar-estudiante.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BuscarEstudianteComponent } from './pagos/buscar-estudiante/buscar-estudiante.component';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PagarPensionesComponent } from './pagos/pagar-pensiones/pagar-pensiones.component';

@NgModule({
  declarations: [
    AppComponent,
    EstudianteComponent,
    PagosComponent,
    RegistrarEstudianteComponent,
    BuscarEstudianteComponent,
    PagarPensionesComponent
  ],
  imports: [
    MatCheckboxModule,
    MatSelectModule,
    FormsModule,
    MatRadioModule,
    MatTableModule,
    MatDialogModule,
    FlexLayoutModule,
    MatButtonModule,
    CommonModule,
    HttpClientModule,
    MatIconModule,
    MatInputModule,
    MatTabsModule,
    MatGridListModule,
    MatCardModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
