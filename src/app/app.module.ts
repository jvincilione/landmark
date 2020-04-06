import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';

import { FaithComponent } from './about/faith/faith.component';
import { PastorComponent } from './about/pastor/pastor.component';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { AppService } from './app.service';
import { CalendarComponent } from './calendar/calendar.component';
import { HeaderComponent } from './common/header/header.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { SermonsComponent } from './sermons/sermons.component';
import { StreamComponent } from './stream/stream.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    PastorComponent,
    FaithComponent,
    ContactComponent,
    CalendarComponent,
    SermonsComponent,
    StreamComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ToastrModule.forRoot(),
    NgxDatatableModule,
    HttpClientModule
  ],
  providers: [
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
