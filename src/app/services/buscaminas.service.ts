import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuscaminasService 
{

  private apiUrl = 
  "https://minesweeper.cool/api";


  constructor(private http: HttpClient) { }

  startNewGame(rows: number, cols: number, bombs: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/start`, { rows, cols, bombs });
  }

  clickCell(gameId: string, row: number, col: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/click`, { gameId, row, col });
  }

  flagCell(gameId: string, row: number, col: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/flag`, { gameId, row, col });
  }
}
