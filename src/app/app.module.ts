import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
	declarations: [AppComponent, TodoComponent],
	imports: [
		BrowserModule,
		FormsModule,
		BrowserAnimationsModule,
		MatProgressBarModule,
		DragDropModule,
		ReactiveFormsModule
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
