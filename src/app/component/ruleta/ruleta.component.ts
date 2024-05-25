import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-ruleta',
  standalone: true,
  imports: [CommonModule,FormsModule,ChatComponent],
  templateUrl: './ruleta.component.html',
  styleUrl: './ruleta.component.css'
})
export class RuletaComponent 
{
  @ViewChild('wheel', { static: false }) wheel!: ElementRef;
  @ViewChild('ball', { static: false }) ball!: ElementRef;

  bettingTable = [
    [
      { number: 0, color: 'green' },
      { number: 28, color: 'black' },
      { number: 9, color: 'red' },
      { number: 26, color: 'black' },
      { number: 30, color: 'red' },
      { number: 11, color: 'black' },
      { number: 7, color: 'red' },
      { number: 20, color: 'black' },
      { number: 32, color: 'red' },
      { number: 17, color: 'black' },
      { number: 5, color: 'red' },
      { number: 22, color: 'black' },
    ],
    [
      { number: 18, color: 'red' },
      { number: 29, color: 'black' },
      { number: 8, color: 'red' },
      { number: 19, color: 'red' },
      { number: 31, color: 'black' },
      { number: 10, color: 'black' },
      { number: 6, color: 'black' },
      { number: 27, color: 'red' },
      { number: 13, color: 'black' },
      { number: 36, color: 'red' },
      { number: 1, color: 'red' },
      { number: 24, color: 'black' },
    ],
    [
      { number: 16, color: 'red' },
      { number: 33, color: 'black' },
      { number: 12, color: 'red' },
      { number: 21, color: 'red' },
      { number: 25, color: 'black' },
      { number: 2, color: 'black' },
      { number: 4, color: 'black' },
      { number: 35, color: 'red' },
      { number: 14, color: 'black' },
      { number: 23, color: 'red' },
      { number: 3, color: 'red' },
      { number: 34, color: 'black' },
    ],
  ];

  score = 0;
  selectedNumber: any = null;

  ngAfterViewInit() {
    this.createWheel();
  }

  createWheel() {
    const numbers = [
      { number: 0, color: 'green' },
      { number: 32, color: 'red' },
      { number: 15, color: 'black' },
      { number: 19, color: 'red' },
      { number: 4, color: 'black' },
      { number: 21, color: 'red' },
      { number: 2, color: 'black' },
      { number: 25, color: 'red' },
      { number: 17, color: 'black' },
      { number: 34, color: 'red' },
      { number: 6, color: 'black' },
      { number: 27, color: 'red' },
      { number: 13, color: 'black' },
      { number: 36, color: 'red' },
      { number: 11, color: 'black' },
      { number: 30, color: 'red' },
      { number: 8, color: 'black' },
      { number: 23, color: 'red' },
      { number: 10, color: 'black' },
      { number: 5, color: 'red' },
      { number: 24, color: 'black' },
      { number: 16, color: 'red' },
      { number: 33, color: 'black' },
      { number: 1, color: 'red' },
      { number: 20, color: 'black' },
      { number: 14, color: 'red' },
      { number: 31, color: 'black' },
      { number: 9, color: 'red' },
      { number: 22, color: 'black' },
      { number: 18, color: 'red' },
      { number: 29, color: 'black' },
      { number: 7, color: 'red' },
      { number: 28, color: 'black' },
      { number: 12, color: 'red' },
      { number: 35, color: 'black' },
      { number: 3, color: 'red' },
      { number: 26, color: 'black' },
    ];

    const wheel = this.wheel.nativeElement;
    numbers.forEach((num, index) => {
      const angle = (index / numbers.length) * 360;
      const numElem = document.createElement('div');
      numElem.classList.add('wheel-number');
      numElem.style.transform = `rotate(${angle}deg) translate(130px)`;
      numElem.textContent = num.number.toString();
      numElem.style.color = num.color;
      wheel.appendChild(numElem);
    });
  }

  spin() {
    const duration = Math.floor(Math.random() * 5000) + 1000;
    const rotation = Math.floor(Math.random() * 360) + 720;

    this.wheel.nativeElement.style.transition = `transform ${duration}ms ease-out`;
    this.wheel.nativeElement.style.transform = `rotate(${rotation}deg)`;

    setTimeout(() => {
      const ballPosition = Math.floor(Math.random() * 37);
      const ballAngle = (ballPosition / 37) * 360;
      this.ball.nativeElement.style.transform = `rotate(${ballAngle}deg) translate(130px)`;

      const resultNumber = ballPosition;
      const resultColor = this.getColor(resultNumber);

      if (resultNumber === this.selectedNumber) {
        this.score += 10;
      }

      this.selectedNumber = null;
    }, duration);
  }

  getColor(number: number): string {
    const colors = [
      'green', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black',
      'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red',
      'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black',
      'red', 'black', 'red', 'black'
    ];
    return colors[number];
  }


}
