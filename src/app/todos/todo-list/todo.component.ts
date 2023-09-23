import { Component } from '@angular/core';
import { TodoService } from "../todo.service";
import { Todo } from '../types';
import { Observable, combineLatest, map } from 'rxjs';
import { FilterEnum } from '../enums';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['../todos.component.scss']
})
export class TodoComponent {
  todosToShow$: Observable<Todo[]>;
  todosCount$: Observable<number>;

  constructor(private todoService: TodoService) {
    // this.todosToShow$ = this.todoService.todos$.pipe(map((todos: Todo[]) => {
    //   let filter = this.todoService.filter$.getValue();
    //   if (filter === FilterEnum.active) {
    //     return todos.filter((todo) => !todo.is_completed);
    //   } else if (filter === FilterEnum.completed) {
    //     return todos.filter((todo) => todo.is_completed);
    //   }
    //   console.log('todos to show', todos);
    //   return todos;
    // }));
    this.todosToShow$ = combineLatest(
      this.todoService.todos$,
      this.todoService.filter$
    ).pipe(
      map(([todos, filter]: [Todo[], FilterEnum]) => {
        if (filter === FilterEnum.active) {
          return todos.filter((todo) => !todo.is_completed);
        } else if (filter === FilterEnum.completed) {
          return todos.filter((todo) => todo.is_completed);
        }
        return todos;
      })
    );

    this.todosCount$ = this.todoService.totalCount$;
  }

  addTodo(text: string) {
    this.todoService.addTodo(text);
  }
}
