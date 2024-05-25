import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MayormenorService {

  private apiUrl = 'https://deckofcardsapi.com/api/deck';

  constructor(private http: HttpClient) { }

  // Método para obtener una nueva baraja de cartas
  getNewDeck() {
    return this.http.get<any>(`${this.apiUrl}/new/shuffle/?deck_count=1`);
  }

  // Método para extraer una carta del mazo
  drawCard(deckId: string) {
    return this.http.get<any>(`${this.apiUrl}/${deckId}/draw/?count=1`);
  }
}


