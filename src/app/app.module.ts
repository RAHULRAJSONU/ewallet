import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AngularFireDatabaseModule } from '@angular/fire/database-deprecated';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { FirebaseService } from './service/firebase.service';
import { AccountComponent } from './features/account/account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { InfoboxComponent } from './components/infobox/infobox.component';
import { InfotileComponent } from './features/infotile/infotile.component';
import { LedgerComponent } from './features/ledger/ledger.component';
import { DatagridComponent } from './components/datagrid/datagrid.component';
import { BoxComponent } from './components/box/box.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LinechartComponent } from './components/linechart/linechart.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md'
import { HttpClientModule } from '@angular/common/http';
import { ConfigService } from './service/config.service';
import { LedgerEntryComponent } from './features/ledger-entry/ledger-entry.component';
import { PositiveNumberDirective } from './directives/positive-number.directive';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthService } from './core/auth.service';
import { UserFormComponent } from './features/users/user-form/user-form.component';
import { NotifyService } from './core/notify.service';
import { UserLoginComponent } from './features/users/user-login/user-login.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    AccountComponent,
    NavbarComponent,
    SidebarComponent,
    InfoboxComponent,
    InfotileComponent,
    LedgerComponent,
    DatagridComponent,
    BoxComponent,
    DashboardComponent,
    LinechartComponent,
    LedgerEntryComponent,
    PositiveNumberDirective,
    PieChartComponent,
    UserFormComponent,
    UserLoginComponent,
    
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),    
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserModule,
    AppRoutingModule,    
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    AngularFireDatabaseModule
  ],
  providers: [FirebaseService,AuthService, ConfigService,NotifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
