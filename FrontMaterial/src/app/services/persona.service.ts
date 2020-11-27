import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class PersonaService {
  private host = "http://localhost:3000/api"
  private headers = new HttpHeaders(
    { 
      'Content-Type': 'application/json'
    }
  );

  constructor(
    private http: HttpClient

  ) { }

  getPersona(){
    const url = `${this.host}/persona`;
    return this.http.get<any[]>(url, {headers: this.headers})
        .pipe(catchError(this.handleError));
  }

  postPersona( persona){
    const url = `${this.host}/persona`;
    return this.http.post<any[]>(url, persona, {headers: this.headers})
        .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<any> {
    console.log('error al conectarse con servidor');
    console.error('An error occurred', error || '');
    return throwError(error);
  }
  
}
