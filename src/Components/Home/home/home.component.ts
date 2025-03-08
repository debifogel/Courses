import { Component, OnInit } from '@angular/core';
import { ButtonToenterComponent } from '../../ButtonToenter/button-toenter/button-toenter.component';
import { ButtonLogComponent } from "../../ButtonLog/button-log/button-log.component";
import { ButtonRegisterComponent } from "../../ButtonRegister/button-register/button-register.component";
import { NavbarComponent } from "../../Navbar/navbar/navbar.component";
import { UserService } from '../../../Service/User/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonToenterComponent, ButtonLogComponent, ButtonRegisterComponent, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private userService: UserService) {
    this.userService.user$.subscribe(user => {
      this.inSite = user!=null;})}
  
  login = false;
  register = false;
  inSite:boolean=false;
  
  ToLogin() {
    this.login = !this.login;
    this.register = false;
  }
  ToRegister() {
    this.register = !this.register;
    this.login = false;
  }
  
}
