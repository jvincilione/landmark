import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FaithComponent } from './about/faith/faith.component';
import { PastorComponent } from './about/pastor/pastor.component';
import { ContactComponent } from './contact/contact.component';
import { CalendarComponent } from './calendar/calendar.component';
import { SermonsComponent } from './sermons/sermons.component';
import { StreamComponent } from './stream/stream.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about/faith', component: FaithComponent },
  { path: 'about/pastor', component: PastorComponent },
  { path: 'get-in-touch', component: ContactComponent },
  { path: 'event-calendar', component: CalendarComponent },
  { path: 'sermon', component: SermonsComponent },
  { path: 'stream', component: StreamComponent },

  { path: 'about', redirectTo: 'about/pastor' },

  { path: 'admin', loadChildren: './admin/admin.module#AdminModule' }
  // { path: '**', redirectTo: '/404.html'}
];
