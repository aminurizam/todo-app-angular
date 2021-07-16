import { Component, OnInit } from '@angular/core';
// import  { CdkD }
import { Todo } from './../models/Todo';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { FormControl, NgForm } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
	selector: 'app-todo',
	templateUrl: './todo.component.html',
	styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
	// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-7.html#definite-assignment-assertions
	// refs: https://stackoverflow.com/questions/49699067/property-has-no-initializer-and-is-not-definitely-assigned-in-the-construc/60113028#60113028
	todos!: Todo[];

	// todo: string = '';
	todo = new FormControl('', [Validators.required]);
	percentageCompleted: number = 0;
	showPercentage: boolean = false;
	// title: string = '';
	title = new FormControl('', Validators.required);

	ngOnInit(): void {
		this.todos = [
			{
				title: 'sudah makan belum',
				completed: true,
			},
			{
				title: 'sudah minum belum',
				completed: true,
			},
			{
				title: 'sudah kahwin belum sudah kahwin belum  sudah kahwin belum sudah kahwin belum  sudah kahwin belum ',
				completed: false,
			},
		];

		this.calculatePercentageCompleted();

	}

	get testTitle() { return this.title }


	calculatePercentageCompleted() {
		// count percentage of task done. eg: if 1 task done, percentage should be 33.33%
		// loop through todos object and count item completed true
		// total item complete / total item * 100%
		// assign to variable
		this.showPercentage = true;
		let todoCompleted = 0;
		this.todos.forEach((value, key) => {
			if (value.completed) todoCompleted++;
		});
		this.percentageCompleted = Math.round(
			(todoCompleted / this.todos.length) * 100
		);
		if(isNaN(this.percentageCompleted)) this.showPercentage = false;
		// console.log(this.percentageCompleted);

	}

	log(todo:any) {
		console.log(todo);
	}

	addTodo() {
		// not sure how to do assign as Object on this
		let uniqueTodo = (value:any) => value.title !== this.todo.value
		console.log(this.todo);

		if(!this.todo.value) return this.todo.setErrors({ required: true });

		if(this.todos.every(uniqueTodo)) {
			this.todos.push({
				title: this.todo.value,
				completed: false,
			});
			this.todo = new FormControl('', [Validators.required]); // how to assign empty string to variable without initialize new form control
			this.calculatePercentageCompleted();
		} else {
			// this.todo.errors.duplicate = true
			console.log('found duplicate');
			this.todo.setErrors({
				duplicate: true
			})
			console.log(this.todo)

			// console.log(this.todo.errors);
		}

	}

	update(index: number) {
		this.todos.map((value, key) => {
			if (key === index) value.completed = !value.completed;
			return value;
		});
		this.calculatePercentageCompleted();
	}

	delete(index: number) {
		this.todos.splice(index, 1);
		this.calculatePercentageCompleted();
	}

	drop(event: CdkDragDrop<string[]>) {
		moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
	}
}
