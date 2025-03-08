import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../Models/User';
import { LoginService } from '../../../Service/Login/login.service';
import { Router } from '@angular/router';
import { UserService } from '../../../Service/User/user.service';
@Component({
  selector: 'app-button-log',
  standalone: true,
  imports:[
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule],
  templateUrl: './button-log.component.html',
  styleUrl: './button-log.component.css'
})
export class ButtonLogComponent  {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,private authService:LoginService,private userServ:UserService,private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      Name:['', [Validators.required]]

    });
  }

  

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password, Name } = this.loginForm.value;
            this.authService.login( email, password).subscribe(
              response => {
                alert('Login successful! '); 
                this.userServ.setUser(new User(response.userId,Name,email,password,response.role)); // Set the user in the user service
                 // Update the user
                

                 this.router.navigate(['/home']); // Optionally reset the form
              },
              error => {
                alert('Login failed. Please try again.')
                
              }
            );
    }
  }
}
