import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreguntadosService {

  private apiUrl = 'https://opentdb.com/api.php';

  constructor(private http: HttpClient) { }

  obtenerPregunta(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?amount=1&lang=en`);
  }
}
