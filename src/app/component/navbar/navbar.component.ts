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
    ChatComponent,],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  getRouterOutletState(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

  constructor(private router: Router,private userService : UserService) {}

  isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }
  
  title = 'TP_1';

  ngOnInit()
  {
    console.log("arranca");
  }

  ngOnDestroy()
  {
    console.log("destroy");
  }

  onClick()
  {
    this.userService.logout()
    .then(()=>{
      this.router.navigate(["/login"]);
      console.log("primero debes loguearte");
    })
    .catch();
  }

}
