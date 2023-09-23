import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../types';
import { HttpClient } from '@angular/common/http';
import { Constants } from 'src/app/constants';
import { Observable, map, pipe } from 'rxjs';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['../todos.component.scss']
})
export class TodoItemComponent {
  editingText: string = '';
  @Input('todo') todo: Todo;
  @Input('isEditing') isEditing: boolean;

  constructor(private todoService: TodoService) {
  }
  changeTodo() {
    this.todoService.update(this.todo, {
      ...this.todo,
      text: this.editingText,
    }).subscribe(() => {
      this.editingText = '';
      this.isEditing = false;
    });
  }
  changeText(event: Event) {
    this.editingText = (event.target as HTMLInputElement).value;
  }

  setTodoInEditMode() {
    this.isEditing = true;
    this.editingText = this.todo.text;
  }
  toggleTodo() {
    throw new Error('Method not implemented.');
  }

  removeTodo(event: Event) {
    event.preventDefault();
    this.todoService.removeTodo(this.todo.id);
  }

  completed(event: Event) {
    event.preventDefault();
    console.log('completed', (event.target as HTMLInputElement).checked)
    this.todoService.update(this.todo, {
      ...this.todo,
      is_completed: (event.target as HTMLInputElement).checked
    }).subscribe();
  }
}
