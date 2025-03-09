import { Component } from '@angular/core';
import { HomeComponent } from '../Components/Home/home/home.component';
import { NavbarComponent } from "../Components/Navbar/navbar/navbar.component";
import { UserService } from '../Service/User/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';
  constructor(private userService: UserService) {
      this.userService.user$.subscribe(user => {
        this.inSite = user!=null;})}
    

inSite:boolean=false;

}
