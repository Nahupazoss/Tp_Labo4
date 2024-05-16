import { Component } from '@angular/core';
import { PreguntadosService } from '../../services/preguntados.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})
export class PreguntadosComponent {
  pregunta: any;
  respuestaSeleccionada: string = '';
  respuestasCorrectas: number = 0;
  respuestasIncorrectas: number = 0;

  constructor(private servicioPreguntados: PreguntadosService) { }

  ngOnInit(): void {
    this.obtenerNuevaPregunta();
  }

  obtenerNuevaPregunta() {
    this.servicioPreguntados.obtenerPregunta().subscribe(
      data => {
        this.pregunta = data.results[0];
      },
      error => {
        console.error('Error al obtener pregunta:', error);
      }
    );
  }

  verificarRespuesta() {
    if (this.respuestaSeleccionada === this.pregunta.correct_answer) {
      this.respuestasCorrectas++;
    } else {
      this.respuestasIncorrectas++;
    }
    this.obtenerNuevaPregunta();
  }
}
