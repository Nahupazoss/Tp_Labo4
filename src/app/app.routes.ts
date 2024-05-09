import { Routes } from '@angular/router';
import{canActivate, redirectUnauthorizedTo} from "@angular/fire/auth-guard";
import { ToastrService } from 'ngx-toastr';

export const routes: Routes = [
      
    {
        path : "login",
        loadComponent : () => import("./component/login/login.component").then((m) => m.LoginComponent)
    },
    {
        
        path : "registro",
        loadComponent : () => import("./component/registro/registro.component").then((m) => m.RegistroComponent)
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
        path : "mayormenor",
        loadComponent : () => import("./component/mayormenor/mayormenor.component").then((m) => m.MayormenorComponent).catch(),
        ...canActivate(()=>redirectUnauthorizedTo(["/login"])),
    },
    {
        path : "ahorcado",
        loadComponent : () => import("./component/ahorcado/ahorcado.component").then((m) => m.AhorcadoComponent).catch(),
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
