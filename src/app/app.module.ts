import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { WeekComponent } from './components/week/week.component';
import { DayComponent } from './components/day/day.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { TaskPopupComponent } from './components/task-popup/task-popup.component';
import { EditTaskPopupComponent } from './components/edit-task-popup/edit-task-popup.component';


@NgModule({
  declarations: [
    AppComponent,
    WeekComponent,
    DayComponent,
    TaskPopupComponent,
    EditTaskPopupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
