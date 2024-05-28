import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { QuienSoyComponent } from '../quien-soy/quien-soy.component';
import { LoginComponent } from '../login/login.component';
import { UserService } from '../../services/user-service.service';
import { CommonModule } from '@angular/common';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    QuienSoyComponent,
    LoginComponent,
    CommonModule,
    ChatComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  user : any;

  constructor(private userService : UserService,private router:Router,)
  {

  }

  onClick()
  {
    this.userService.logout()
    .then(()=>{
      this.router.navigate(["/login"]);
    })
    .catch(error => console.log(error))
  }


  ngOnInit()
  {
    this.userService.getUserEstado().subscribe(usuario => {
      this.user = usuario;
      console.log(this.user); 
    });
    console.log("home");
  }

}
