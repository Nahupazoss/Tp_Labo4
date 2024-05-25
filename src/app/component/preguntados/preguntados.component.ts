import { Component } from '@angular/core';
import { PreguntadosService } from '../../services/preguntados.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule,ChatComponent],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})
export class PreguntadosComponent {
  questions: any[] = [];
  currentQuestionIndex: number = 0;
  isAnswered: boolean = false;
  selectedAnswer: string | null = null;
  lives: number = 3;
  correctAnswers: number = 0;
  gameStatus: 'playing' | 'won' | 'lost' = 'playing';
  allAnswers: string[][] = [];

  constructor(private preguntadosService: PreguntadosService) { }

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.preguntadosService.getQuestions().subscribe(
      data => {
        this.questions = data.results;
        this.questions.forEach(question => {
          this.allAnswers.push(this.getAllAnswers(question));
        });
      },
      error => {
        console.error('Error fetching trivia questions', error);
      }
    );
  }

  getAllAnswers(question: any): string[] {
    const answers = [...question.incorrect_answers];
    const randomIndex = Math.floor(Math.random() * (answers.length + 1));
    answers.splice(randomIndex, 0, question.correct_answer);
    return answers;
  }

  selectAnswer(answer: string): void {
    if (this.isAnswered) return;

    this.isAnswered = true;
    this.selectedAnswer = answer;

    if (answer === this.questions[this.currentQuestionIndex].correct_answer) {
      this.correctAnswers++;
      if (this.correctAnswers >= 5) {
        this.gameStatus = 'won';
      }
    } else {
      this.lives--;
      if (this.lives <= 0) {
        this.gameStatus = 'lost';
      }
    }
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.isAnswered = false;
      this.selectedAnswer = null;
    }
  }

  restartGame(): void {
    this.currentQuestionIndex = 0;
    this.isAnswered = false;
    this.selectedAnswer = null;
    this.lives = 3;
    this.correctAnswers = 0;
    this.gameStatus = 'playing';
    this.allAnswers = [];
    this.loadQuestions();
  }
}
