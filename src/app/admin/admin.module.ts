import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SermonComponent } from './sermon/sermon.component';
import { AddComponent } from './sermon/add/add.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SermonComponent, AddComponent]
})
export class AdminModule { }
