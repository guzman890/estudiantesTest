import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class DetalleCronogramaService {
  private host = "http://localhost:3000/api"
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient

  ) { }

  getDetalleCronogramaByIdCronograma(id_cronograma){
    const url = `${this.host}/detalle_cronograma/cronograma/${id_cronograma}`;
    return this.http.get<any[]>(url, {headers: this.headers})
        .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<any> {
    console.log('error al conectarse con servidor');
    console.error('An error occurred', error || '');
    return throwError(error);
  }
}
