import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MovimientoService {
  private host = "http://localhost:3000/api"
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient

  ) { }

  getMovimientoByIdPersona( nid_persona ){
    const url = `${this.host}/movimiento/persona/${nid_persona}`;
    return this.http.get<any>(url, {headers: this.headers})
        .pipe(catchError(this.handleError));
  }

  createMovimientos( arregloMovimiento ){
    const url = `${this.host}/movimiento`;
    return this.http.post<any>(url, arregloMovimiento, {headers: this.headers})
        .pipe(catchError(this.handleError));
  }

  updateMovimientos( arregloMovimiento ){
    const url = `${this.host}/movimiento`;
    return this.http.put<any>(url, arregloMovimiento, {headers: this.headers})
        .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<any> {
    console.log('error al conectarse con servidor');
    console.error('An error occurred', error || '');
    return throwError(error);
  }
}
