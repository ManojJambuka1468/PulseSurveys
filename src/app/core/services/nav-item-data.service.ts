import { Injectable } from '@angular/core';
import { leftNavMenuItems } from 'src/app/shared/constants/left-nav-menu-items';
import { AuthService } from '../authentication/auth.service';
@Injectable({
  providedIn: 'root'
})
export class NavItemDataService {
  constructor(private authService:AuthService){}
  getLeftNavList(){
    return leftNavMenuItems.items.filter(item=>item.roles.includes(this.authService.getClaims().role));
  }
}
