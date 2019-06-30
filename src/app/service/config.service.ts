import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { SidebarConfig } from '../domain/SidebarConfig';
import { HttpClient } from '@angular/common/http';
import * as sconfig from '../config/sidebar.json';
import * as appSet from '../config/appSetting.json';

@Injectable({providedIn:"root"})
export class ConfigService{
    private sidebarConfig = new BehaviorSubject<SidebarConfig>(new SidebarConfig());
    config = this.sidebarConfig.asObservable();
    private applicationSetting = new BehaviorSubject<any>({});
    appSetting = this.applicationSetting.asObservable();

    constructor(public http: HttpClient){
        this.loadSidebarConfig();
        this.loadAppSetting();
    }

    loadSidebarConfig(){
        return this.sidebarConfig.next(sconfig.default);
    }

    loadAppSetting(){
        return this.applicationSetting.next(appSet.default);
    }

}