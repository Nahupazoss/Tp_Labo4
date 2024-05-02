import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user-service.service';
import { CommonModule } from '@angular/common';
import { UserCredential } from '@angular/fire/auth';

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

  constructor(private userService:UserService,private router:Router)
  {
    this.formLogin = new FormGroup({
      email:new FormControl(),
      password:new FormControl()})
  }

  onSubmit()
  {
    if(this.formLogin.valid)
    {
      this.userService.login(this.formLogin.value)
      .then(response => {
        console.log(response);
        this.router.navigate(["/home"]);
      })
      .catch(error => console.log(error));
    }
    else
    {
      console.log("error,campos invalaidos o incompletos");
    }
    
  }

  onSubmitHarcode()
  {
    this.userService.loginHarcode("","")
    .then(response => {
      console.log(response);
      this.router.navigate(["/home"]);
    })
    .catch(error => console.log(error));
  }

}
