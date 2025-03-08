import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginService } from '../../../Service/Login/login.service';
import { UserService } from '../../../Service/User/user.service';
import { Router } from '@angular/router';
import { User } from '../../../Models/User';

@Component({
  selector: 'app-button-register',
  standalone: true,
  imports: [ReactiveFormsModule,
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule],
  templateUrl: './button-register.component.html',
  styleUrl: './button-register.component.css'
})
export class ButtonRegisterComponent {
registerForm: FormGroup;
successMessage: string | null = null;
errorMessage: string | null = null;
  

  constructor(private fb: FormBuilder,private authService:LoginService,private userServ:UserService,private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      Name:['', [Validators.required]],
      role:['',[Validators.required]]
    });
  }

  

  onSubmit() 
  {
    if (this.registerForm.valid) {
      const { email, password, Name,role } = this.registerForm.value;
      this.authService.register(Name, email, password,role).subscribe(
        response => {
          alert('Registration successful! '); 
          this.userServ.setUser(new User(response.userId,Name,email,password,role)); // Set the user in the user service
           // Update the user
           
           this.router.navigate(['/home']); // Optionally reset the form
        },
        error => {
          alert('Registration failed. Please try again.')
          
        }
      );
}
  }
}
