import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { QuienSoyComponent } from '../quien-soy/quien-soy.component';
import { LoginComponent } from '../login/login.component';
import { UserService } from '../../services/user-service.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    QuienSoyComponent,
    LoginComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private userService : UserService,private router:Router)
  {

  }

  onClick()
  {
    this.userService.logout()
    .then(()=>{
      this.router.navigate(["/login"]);
      console.log("primero debes loguearte");
    })
    .catch(error => console.log(error))
  }


  ngOnInit()
  {
    console.log("home");
  }

}
