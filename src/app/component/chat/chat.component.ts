import { CommonModule, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user-service.service';
import { Usuario } from '../../interface/usuario';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']  // Ajuste aquí: styleUrls, no styleUrl
})
export class ChatComponent implements OnInit {
  usuarioLogueado: any;
  nuevoMensaje: Usuario = {};
  mensajes: any = [];
  isMinimized: boolean = false;

  constructor(private authService: UserService) {}

  ngOnInit(): void {
    this.usuarioLogueado = this.authService.getUserInfo();
    this.authService.getMessages().subscribe(mensajes => {
      this.mensajes = mensajes.map(mensaje => ({
        ...mensaje,
        hora: this.formatMessageTime(mensaje.hora)
      }));
    });
  }

  formatMessageTime(timestamp: Timestamp): string {
    const date = timestamp.toDate();
    return formatDate(date, 'hh:mm:ss a', 'en-US');
  }

  enviarMensaje() {
    this.authService.getUserInfo().then(user => {
      if (user) {
        const mensajeInfo: Usuario = {
          uid: user.uid,
          email: user.email,
          mensaje: this.nuevoMensaje.mensaje,
          hora: Timestamp.now(),
        };
        this.nuevoMensaje = mensajeInfo;
        this.authService.saveMessage(this.nuevoMensaje);
        this.nuevoMensaje.mensaje = "";
        console.log("mensaje exitoso");
      } else {
        console.log("usuario no encontrado");
      }
    }).catch(error => console.error(error));
  }

  minimizeChat() {
    this.isMinimized = !this.isMinimized;
  }
}
