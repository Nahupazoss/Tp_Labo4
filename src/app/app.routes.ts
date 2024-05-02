import { Routes } from '@angular/router';
import{canActivate, redirectUnauthorizedTo} from "@angular/fire/auth-guard";

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
        loadComponent : () => import("./component/home/home.component").then((m) => m.HomeComponent),
        ...canActivate(()=>redirectUnauthorizedTo(["/login"]))
    },
    {
        path : "quiensoy",
        loadComponent : () => import("./component/quien-soy/quien-soy.component").then((m) => m.QuienSoyComponent)
    },
    {
        path : "**",
        loadComponent : () => import("./component/error/error.component").then((m) => m.ErrorComponent)
    }, 
    {
        path : "",
        loadComponent : () => import("./component/login/login.component").then((m) => m.LoginComponent)
    },
  
    

];
