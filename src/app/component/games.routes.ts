import { Routes } from '@angular/router';
import{canActivate, redirectUnauthorizedTo} from "@angular/fire/auth-guard";
import { ToastrService } from 'ngx-toastr';

export const routes: Routes = [
      
    {
        path : "ahorcado",
        loadComponent : () => import("./ahorcado/ahorcado.component").then((m) => m.AhorcadoComponent).catch(),
        ...canActivate(()=>redirectUnauthorizedTo(["/login"])),
    },
    {
        path : "mayormenor",
        loadComponent : () => import("./mayormenor/mayormenor.component").then((m) => m.MayormenorComponent).catch(),
        ...canActivate(()=>redirectUnauthorizedTo(["/login"])),
    },
    {
        path : "preguntados",
        loadComponent : () => import("./preguntados/preguntados.component").then((m) => m.PreguntadosComponent).catch(),
        ...canActivate(()=>redirectUnauthorizedTo(["/login"])),
    },
    {
        path : "ruleta",
        loadComponent : () => import("./ruleta/ruleta.component").then((m) => m.RuletaComponent).catch(),
        ...canActivate(()=>redirectUnauthorizedTo(["/login"])),
    },
    {
        path : "buscaminas",
        loadComponent : () => import("./buscaminas/buscaminas.component").then((m) => m.BuscaminasComponent).catch(),
        ...canActivate(()=>redirectUnauthorizedTo(["/login"])),
    },
    
];

export default routes;

