import { Component } from '@angular/core';
import { FilterEnum } from '../enums';
import { TodoService } from '../todo.service';
import { Observable, filter, map } from 'rxjs';

@Component({
  selector: 'app-todos-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['../todos.component.scss']
})
export class FooterComponent {
  filters = FilterEnum;
  filter$: Observable<FilterEnum>;
  activeCount$: Observable<number>;

  constructor(private todoService: TodoService) {
    this.filter$ = this.todoService.filter$;

    this.activeCount$ = this.todoService.activeCount$;
  }

  changeFilter(filterName: FilterEnum): void {
    this.todoService.changeFilter(filterName);
  }
}
