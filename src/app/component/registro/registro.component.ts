import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user-service.service';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [    ReactiveFormsModule,FormsModule,RouterLink,RouterOutlet,RouterLinkActive],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent
{
  formReg : FormGroup;
  toastScv = inject(ToastrService);

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
      this.toastScv.success("");
      this.router.navigate(["/login"]);
    })
    .catch((e:Error) => {
      console.log(e);
      this.toastScv.error("ERROR");
    });
  }

}
