import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import {TasksComponent, UpdateTaskDialog} from './tasks/tasks.component';
import {HttpErrorHandler} from './http-error-handler.service';
import {MessageService} from './message.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent, TasksComponent, UpdateTaskDialog
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    HttpModule, 
    FormsModule, 
    HttpClientModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatTableModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatButtonModule
    ],
    entryComponents: [UpdateTaskDialog, TasksComponent],
  providers: [MessageService, 
    HttpErrorHandler, { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }],
  bootstrap: [AppComponent]
})
export class AppModule { }
