import { Component, OnInit, Input } from '@angular/core';
import { SidebarConfig } from 'src/app/domain/SidebarConfig';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() sidebarConfig: SidebarConfig;

  constructor(private configService: ConfigService) { 
    this.configService.config.subscribe(c=> {
      this.sidebarConfig = c;
    })
  }

  ngOnInit() {
    
  }

}
