import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { user } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit{
  currentUser!:user;
  constructor(private userService:UserService, private authService: AuthService){}
  ngOnInit(): void {
    this.userService.getUserbyId().subscribe((data)=>{
      this.currentUser=data
      console.log(this.currentUser,'from header');
    });
  }
  userName:string='Manoj Jambuka';
  currentDate:Date=new Date();
  logout(){
    console.log('logout');
    this.authService.logout();
  }
}
