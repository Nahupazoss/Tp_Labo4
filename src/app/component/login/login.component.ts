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

  onSubmit()
  {
    if(this.formLogin.valid)
    {
      this.userService.login(this.formLogin.value)
      .then(response => {
        console.log(response);
        this.toastScv.success("SUCCESS");
        this.router.navigate(["/home"]);
      })
      .catch((e:Error) => {
        console.log(e);
        this.toastScv.error("ERROR");
      });
    }
    else
    {
      this.toastScv.error("ERROR");
      console.log("error,campos invalaidos o incompletos");
    }
    
  }

  onSubmitHarcode()
  {
    this.userService.loginHarcode("","")
    .then(response => {
      console.log(response);
      this.toastScv.success("SUCCESS");
      this.router.navigate(["/home"]);
    })
    .catch(error => console.log(error));
  }

}
