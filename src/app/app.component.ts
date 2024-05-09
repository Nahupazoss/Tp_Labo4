import { Component } from '@angular/core';
import { RouterOutlet , RouterLink } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegistroComponent } from './component/registro/registro.component';
import { HomeComponent } from './component/home/home.component';
import { QuienSoyComponent } from './component/quien-soy/quien-soy.component';
import { ErrorComponent } from './component/error/error.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './services/user-service.service';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './component/chat/chat.component';

@Component({
  selector: 'app-root',
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
    
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  
{
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
    .catch(error => console.log(error))
  }

}
