import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { RegistroComponent } from '../registro/registro.component';
import { ChatComponent } from '../chat/chat.component';
import { HomeComponent } from '../home/home.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { QuienSoyComponent } from '../quien-soy/quien-soy.component';
import { ErrorComponent } from '../error/error.component';
import { UserService } from '../../services/user-service.service';
import { User } from '@angular/fire/auth';
import { ComoJuegoComponent } from '../como-juego/como-juego.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet,
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    RouterLink,
    QuienSoyComponent,
    ErrorComponent,
    CommonModule,
    ChatComponent,
    ComoJuegoComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(public authService: UserService) { }

  ngOnInit(): void 
  {
    this.authService.getUserEstado();
  }

  onClick() 
  {
    this.authService.logout();
  }

}
