import { Routes } from '@angular/router';
import{canActivate, redirectUnauthorizedTo,redirectLoggedInTo} from "@angular/fire/auth-guard";
import { ToastrService } from 'ngx-toastr';

export const routes: Routes = [
      
    {
        path : "login",
        loadComponent : () => import("./component/login/login.component").then((m) => m.LoginComponent).catch(),
        ...canActivate(()=>redirectLoggedInTo(["/home"])),
    },
    {
        
        path : "registro",
        loadComponent : () => import("./component/registro/registro.component").then((m) => m.RegistroComponent).catch(),
        ...canActivate(()=>redirectLoggedInTo(["/home"])),
    },
    {
        
        path : "comojuego",
        loadComponent : () => import("./component/como-juego/como-juego.component").then((m) => m.ComoJuegoComponent).catch(),
    },
    {
        path : "home",
        loadComponent : () => import("./component/home/home.component").then((m) => m.HomeComponent).catch(),
        ...canActivate(()=>redirectUnauthorizedTo(["/login"])),
    },
    {
        path : "quiensoy",
        loadComponent : () => import("./component/quien-soy/quien-soy.component").then((m) => m.QuienSoyComponent)
    },
    {
        path : "games",
        loadChildren : () => import("./component/games.routes").catch(),
        ...canActivate(()=>redirectUnauthorizedTo(["/login"])),
    },
    {
        path: '', redirectTo: 'login', pathMatch: 'full'
    },
    {
        path : "**",
        loadComponent : () => import("./component/error/error.component").then((m) => m.ErrorComponent)
    }, 
  
    

];
