import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from '../chat/chat.component';

enum CellStatus {
  Hidden,
  Revealed,
  Flagged
}

@Component({
  selector: 'app-buscaminas',
  standalone: true,
  imports: [CommonModule,FormsModule,ChatComponent],
  templateUrl: './buscaminas.component.html',
  styleUrl: './buscaminas.component.css'
})
export class BuscaminasComponent 
{
  rows: number = 8;
  cols: number = 8;
  bombCount: number = 10;
  cells: any[][] = [];
  score: number = 0;
  gameOver: boolean = false;
  win: boolean = false;

  CellStatus = CellStatus;  // Añadir esto para hacer accesible CellStatus en el template

  constructor() {
    this.initGame();
  }

  initGame() {
    this.cells = [];
    for (let i = 0; i < this.rows; i++) {
      this.cells[i] = [];
      for (let j = 0; j < this.cols; j++) {
        this.cells[i][j] = { bomb: false, revealed: false, status: CellStatus.Hidden };
      }
    }

    let bombsPlaced = 0;
    while (bombsPlaced < this.bombCount) {
      const row = Math.floor(Math.random() * this.rows);
      const col = Math.floor(Math.random() * this.cols);
      if (!this.cells[row][col].bomb) {
        this.cells[row][col].bomb = true;
        bombsPlaced++;
      }
    }
  }

  cellClicked(row: number, col: number) {
    if (this.gameOver || this.cells[row][col].revealed || this.cells[row][col].status === CellStatus.Flagged) return;

    if (this.cells[row][col].bomb) {
      this.gameOver = true;
      this.cells[row][col].revealed = true;
      this.score = 0;
    } else {
      this.revealCell(row, col);
      if (this.checkWin()) {
        this.win = true;
      }
    }
  }

  flagCell(row: number, col: number, event: Event) {
    event.preventDefault();
    if (this.gameOver || this.cells[row][col].revealed) return;

    if (this.cells[row][col].status === CellStatus.Hidden) {
      this.cells[row][col].status = CellStatus.Flagged;
    } else if (this.cells[row][col].status === CellStatus.Flagged) {
      this.cells[row][col].status = CellStatus.Hidden;
    }
  }

  revealCell(row: number, col: number) {
    if (this.cells[row][col].revealed) return;

    this.cells[row][col].revealed = true;
    this.score++;

    if (this.calculateAdjacentBombs(row, col) === 0) {
      for (let i = Math.max(0, row - 1); i <= Math.min(row + 1, this.rows - 1); i++) {
        for (let j = Math.max(0, col - 1); j <= Math.min(col + 1, this.cols - 1); j++) {
          if (!this.cells[i][j].revealed) {
            this.revealCell(i, j);
          }
        }
      }
    }
  }

  checkWin(): boolean {
    return this.score === (this.rows * this.cols - this.bombCount);
  }

  calculateAdjacentBombs(row: number, col: number): number {
    let count = 0;
    for (let i = Math.max(0, row - 1); i <= Math.min(row + 1, this.rows - 1); i++) {
      for (let j = Math.max(0, col - 1); j <= Math.min(col + 1, this.cols - 1); j++) {
        if (this.cells[i][j].bomb) {
          count++;
        }
      }
    }
    return count;
  }

  resetGame() {
    this.newGame();
  }

  newGame() {
    this.initGame();
    this.score = 0;
    this.gameOver = false;
    this.win = false;
  }
}
