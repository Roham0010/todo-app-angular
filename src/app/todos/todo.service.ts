import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "../auth/services/auth-service.service";
import { Constants } from '../constants';
import { Todo } from './types';
import { BehaviorSubject, Observable, filter, map } from 'rxjs';
import { FilterEnum } from './enums';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos$ = new BehaviorSubject<Todo[]>([]);
  filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all);
  activeCount$: Observable<number>;
  totalCount$: Observable<number>;

  constructor(private http: HttpClient, private auth: AuthService) {
    console.log('hello construct service todo');
    this.getTodos().subscribe((data: Todo[]) => this.todos$.next(data));

    this.activeCount$ = this.todos$.pipe(
      map((todos) => todos.filter((todo) => !todo.is_completed).length)
    );

    this.totalCount$ = this.todos$.pipe(
      map((todos) => todos.length)
    );
  }

  addTodo(text: string) {
    let res;
    this.http.post<Todo>(Constants.todosUrl, {
      text,
    }).subscribe(res => {
      let updatedTodos = [
        {
          id: res.id,
          text: res.text,
          is_completed: res.is_completed
        },
        ...this.todos$.getValue(),
      ];

      this.todos$.next(updatedTodos);
    });


  }

  getTodos(): Observable<Todo[]> {
    return this.http.get<{ todos: Todo[] }>(Constants.todosUrl)
      .pipe(map(items => this.sort(items.todos)));
  }

  removeTodo(id: number) {
    this.http.delete(Constants.todosUrl + "/" + id).subscribe(res => {
      let updatedTodos = this.todos$.getValue().filter(todo => todo.id !== id);

      this.todos$.next(this.sort(updatedTodos));
    });
  }

  update(todo: Todo, data: any) {
    return this.http.put<Todo>(Constants.todosUrl + "/" + todo.id, data)
      .pipe(map(() => {
        let updatedTodos = this.todos$.getValue().map(todo1 => {
          if (todo.id === todo1.id) {
            todo1 = {
              ...todo,
              ...data
            };
          }
          return todo1;
        });

        this.todos$.next(this.sort(updatedTodos));
      }));
  }

  sort(todos: Todo[]): Todo[] {
    let completed = todos.filter(item => item.is_completed);
    let notCompleted = todos.filter(item => !item.is_completed);

    console.log(notCompleted, completed);
    return [...notCompleted, ...completed];
  }

  changeFilter(filterKey: FilterEnum): void {
    this.filter$.next(filterKey);
  }
}
