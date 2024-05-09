import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user-service.service';
import { CommonModule } from '@angular/common';
import { UserCredential } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent
{
  formLogin : FormGroup;
  toastScv = inject(ToastrService);

  constructor(private userService:UserService,private router:Router)
  {
    this.formLogin = new FormGroup({
      email:new FormControl(),
      password:new FormControl()})
  }

  async onSubmit() 
  {
    if (this.formLogin.valid) 
    {
      try
      {
        const user = await this.userService.login(this.formLogin.value);
        await this.userService.saveLoginInfo(this.formLogin.value.email);
        this.toastScv.success("¡Inicio de sesión exitoso!");
        this.router.navigate(['/home']);
      } 
      catch (error) 
      {
        this.toastScv.error("¡Error al iniciar sesión!");
      }
    } 
    else 
    {
      this.toastScv.error("¡Por favor, complete todos los campos!");
    }
  }
 

  onSubmitHarcode()
  {
    this.formLogin.patchValue({

      email : "luz@gmail.com",
      password : "luz123",
    });
  }

}
