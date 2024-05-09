import { CommonModule, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user-service.service';
import { Usuario } from '../../interface/usuario';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit
{
  usuarioLogueado:any;
  nuevoMensaje:Usuario;
  mensajes : any = [];

  constructor(private authService:UserService){
    this.nuevoMensaje = {};
  }

  enviarMensaje() 
  {
        this.authService.getUserInfo()
        .then(user =>
        {

          if(user){
  
            const mensajeInfo: Usuario = 
            {
              uid: user.uid,
              email: user.email,
              mensaje: this.nuevoMensaje.mensaje,
              hora: Timestamp.now(),
            };

            this.nuevoMensaje = mensajeInfo;
            this.authService.saveMessage(this.nuevoMensaje);
  
            this.nuevoMensaje.mensaje="";
  
            console.log("mensaje exitoso");
  
          }
          else
          {
  
            console.log("usuario no encontrado");
          }
        })
        .catch()
    
  }

  ngOnInit(): void {
    this.usuarioLogueado = this.authService.getUserInfo(); 
    this.authService.getMessages().subscribe(mensajes => 
      {
      this.mensajes = mensajes.map(mensaje => 
        {
        return {
          ...mensaje,
          hora: this.formatMessageTime(mensaje.hora)
        };
      });
    });
  }

  formatMessageTime(timestamp: Timestamp): string {
    const date = timestamp.toDate(); // Convertir la marca de tiempo a un objeto Date
    return formatDate(date, 'hh:mm:ss a', 'en-US'); // Formatear la hora
  }


}
