import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-mayormenor',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './mayormenor.component.html',
  styleUrl: './mayormenor.component.css',
  encapsulation : ViewEncapsulation.None
})
export class MayormenorComponent 
{
  currentCard: string = "";
  resultMessage: string = "";
  score: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.currentCard = this.generateCard();
  }

  generateCard(): string {
    const suits = ['Corazones', 'Diamantes', 'Tréboles', 'Picas'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const randomSuit = suits[Math.floor(Math.random() * suits.length)];
    const randomValue = values[Math.floor(Math.random() * values.length)];
    return randomValue + ' de ' + randomSuit;
  }

  guess(choice: string): void {
    const nextCard = this.generateCard();
    this.resultMessage = `Carta siguiente: ${nextCard}`;

    if ((choice === 'mayor' && nextCard > this.currentCard) || (choice === 'menor' && nextCard < this.currentCard)) {
      this.resultMessage += ' ¡Correcto!';
      this.score++; // Aumentamos el puntaje en 1
    } else {
      this.resultMessage += ' ¡Incorrecto!';
      this.score = 0;
    }

    // Actualiza la carta actual
    this.currentCard = nextCard;
  }
}
