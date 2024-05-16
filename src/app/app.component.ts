import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './component/navbar/navbar.component';
import { LoginComponent } from './component/login/login.component';
import { RegistroComponent } from './component/registro/registro.component';
import { ChatComponent } from './component/chat/chat.component';
import { HomeComponent } from './component/home/home.component';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,FormsModule,NavbarComponent,LoginComponent,RegistroComponent,ChatComponent,HomeComponent,RouterOutlet

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  
{
    title = 'TP_1';

}