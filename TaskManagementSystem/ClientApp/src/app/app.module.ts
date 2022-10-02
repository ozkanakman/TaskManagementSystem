import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { FetchTaskComponent } from './fetch-task/fetch-task.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { DatePipe } from '@angular/common'
import { FetchCommentComponent } from './fetch-comment/fetch-comment.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    FetchTaskComponent,
    AddTaskComponent,
    FetchCommentComponent,
    AddCommentComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: FetchTaskComponent, pathMatch: 'full' },
      { path: 'add-task', component: AddTaskComponent },
      { path: 'task/edit/:id', component: AddTaskComponent },
      { path: 'fetch-comment/:id', component: FetchCommentComponent },
      { path: 'add-comment', component: AddCommentComponent },
      { path: 'comment/edit/:id', component: AddCommentComponent },
    ]),
    BrowserAnimationsModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule { }
