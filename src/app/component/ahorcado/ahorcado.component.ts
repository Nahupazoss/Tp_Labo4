import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})
export class AhorcadoComponent 
{
  words: string[] = ['ANGULAR', 'REACT', 'AMIGOS', 'CAMPERA', 'TYPESCRIPT',"PELOTA","ELEFANTE","ESTERNOCLEIDOMASTOIDEO","LOBO"
  ,"COLECTIVO","COMPUTADORA","ARQUITECTURA","CAFE","CELULAR","PERRO","VENTANA","REMERA","ZAPATILLAS","ESCRITORIO"]; // Lista de palabras
  wordToGuess: string[] = this.getRandomWord(); // Palabra actual a adivinar
  guessedLetters: string[] = [];
  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  maxAttempts: number = 7;
  attemptsLeft: number = this.maxAttempts;
  gameOver: boolean = false;
  gameResult: string = '';
  currentImageIndex: number = 0; // Índice de la imagen actual del ahorcado

  guess(letter: string): void {
    if (!this.guessedLetters.includes(letter)) 
    {
      this.guessedLetters.push(letter);
      if (!this.wordToGuess.includes(letter)) 
      {
        this.attemptsLeft--;
        this.currentImageIndex++;
      }
    }
    if (this.attemptsLeft === 0 || this.wordToGuess.every(letter => this.guessedLetters.includes(letter))) 
    {
      this.gameOver = true;
      this.gameResult = this.attemptsLeft === 0 ? '¡Perdiste! La palabra era: ' + this.wordToGuess.join('') : '¡Ganaste!';
    }
  }

  getImageUrl(): string 
  {
    return `../../assets/ahorcado/${this.currentImageIndex}.jpg`; // Ruta de la imagen del ahorcado basada en el índice actual
  }

  getRandomWord(): string[] {
    const randomIndex = Math.floor(Math.random() * this.words.length);
    return this.words[randomIndex].split('');
  }

  generateNewWord(): void {
    this.wordToGuess = this.getRandomWord();
    this.guessedLetters = [];
    this.attemptsLeft = this.maxAttempts;
    this.gameOver = false;
    this.gameResult = '';
    this.currentImageIndex = 0;
  }

}
