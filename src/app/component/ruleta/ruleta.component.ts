import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ruleta',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './ruleta.component.html',
  styleUrl: './ruleta.component.css'
})
export class RuletaComponent 
{
  score: number = 0; // Score del jugador
  numeroElegido: any;
  colorElegido: any;
  resultado: any;
  numeros: number[] = Array.from(Array(37).keys());

  apostarNumero(numero: number) {
    this.numeroElegido = numero;
    this.verificarResultado();
  }

  apostarColor(color: string) {
    this.colorElegido = color;
    this.verificarResultado();
  }

  verificarResultado() {
    // Simulación del giro de la ruleta y obtención del resultado
    this.resultado = Math.floor(Math.random() * 37); // Número aleatorio entre 0 y 36

    // Verificar si el jugador acertó el número o el color
    if ((this.numeroElegido !== undefined && this.resultado === this.numeroElegido) ||
        (this.colorElegido !== undefined && this.colorElegido === this.getColor(this.resultado))) {
      this.score++; // Sumar un punto al score si acertó
    }
  }

  getColor(numero: number): string {
    // Función para determinar el color de un número en la ruleta
    if (numero === 0) {
      return 'verde';
    } else if ((numero >= 1 && numero <= 10) || (numero >= 19 && numero <= 28)) {
      return numero % 2 === 0 ? 'negro' : 'rojo';
    } else {
      return numero % 2 === 0 ? 'rojo' : 'negro';
    }
  }

  reiniciarJuego() {
    this.score = 0;
    this.numeroElegido = undefined;
    this.colorElegido = undefined;
  }
}
