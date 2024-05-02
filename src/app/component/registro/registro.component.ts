import { Component } from '@angular/core';
import { UserService } from '../../services/user-service.service';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [    ReactiveFormsModule,FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent
{
  formReg : FormGroup;

  constructor(private userService : UserService,private router:Router)
  {
    this.formReg = new FormGroup({
      email:new FormControl(),
      password:new FormControl()})
  }


  onSubmit() 
  {
    console.log(this.formReg.value.email);
    this.userService.register(this.formReg.value)
    .then(response =>{
      console.log(response)
      this.router.navigate(["/login"]);
    })
    .catch(error => console.log(error));
  }

}
