import { Component } from '@angular/core';
import { TodoService } from "../todo.service";

@Component({
  selector: 'app-todos-header',
  templateUrl: './header.component.html',
  styleUrls: ['../todos.component.scss']
})

export class HeaderComponent {
  text: string = '';

  constructor(private todoService: TodoService) {
  }

  changeText(event: Event): void {
    this.text = (event.target as HTMLInputElement).value;
  }

  addTodo() {
    this.todoService.addTodo(this.text);
    this.text = '';
  }
}
