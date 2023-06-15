import { Component, OnInit } from '@angular/core';
import { navItem } from 'src/app';
import { NavItemDataService } from 'src/app/core/services/nav-item-data.service';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html'
})
export class LeftNavComponent implements OnInit {

  navlist:navItem[]=[];
  constructor(private dataservice:NavItemDataService){
  }
  
  ngOnInit(): void {
    this.navlist=this.dataservice.getLeftNavList();
  }
}
