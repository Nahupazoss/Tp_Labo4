import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { ChatComponent } from '../chat/chat.component';
import { FormsModule } from '@angular/forms';
import { MayormenorService } from '../../services/mayormenor.service';

@Component({
  selector: 'app-mayormenor',
  standalone: true,
  imports: [CommonModule,FormsModule,ChatComponent],
  templateUrl: './mayormenor.component.html',
  styleUrl: './mayormenor.component.css',
  encapsulation : ViewEncapsulation.None
})
export class MayormenorComponent 
{
  deckId: string = "";
  currentCard: any;
  resultMessage: string = "";
  score: number = 0;
  lives: number = 3; // Vidas
  winStreak: number = 0; // Racha de aciertos consecutivos
  result: boolean = false;

  constructor(private apiService: MayormenorService) {}

  ngOnInit(): void {
    this.startGame();
  }

  startGame() {
    this.result = false;
    this.lives = 3;
    this.apiService.getNewDeck().subscribe(data => {
      this.deckId = data.deck_id;
      this.drawCard();
    });
  }

  drawCard() {
    this.apiService.drawCard(this.deckId).subscribe(data => {
      this.currentCard = data.cards[0];
    });
  }

  guessHigher() {
    this.apiService.drawCard(this.deckId).subscribe(data => {
      const nextCard = data.cards[0];
      if (nextCard.value > this.currentCard.value) {
        this.resultMessage = '¡Correcto!';
        this.score++;
        this.winStreak++;
        if (this.winStreak >= 5) {
          this.result = true;
          this.resultMessage = '¡Felicidades! ¡Ganaste!';
        }
      } else {
        this.resultMessage = '¡Incorrecto!';
        this.lives--;
        this.winStreak = 0;
        if (this.lives === 0) {
          this.result = true;
          this.resultMessage = '¡Perdiste! Inténtalo de nuevo.';
        }
      }
      this.currentCard = nextCard;
    });
  }

  guessLower() {
    this.apiService.drawCard(this.deckId).subscribe(data => {
      const nextCard = data.cards[0];
      if (nextCard.value < this.currentCard.value) {
        this.resultMessage = '¡Correcto!';
        this.score++;
        this.winStreak++;
        if (this.winStreak >= 5) {
          this.result = true;
          this.resultMessage = '¡Felicidades! ¡Ganaste!';
        }
      } else {
        this.resultMessage = '¡Incorrecto!';
        this.lives--;
        this.winStreak = 0;
        if (this.lives === 0) {
          this.result = true;
          this.resultMessage = '¡Perdiste! Inténtalo de nuevo.';
        }
      }
      this.currentCard = nextCard;
    });
  }

  newGame() {
    this.startGame();
  }
}
