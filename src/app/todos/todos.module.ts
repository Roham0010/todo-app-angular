import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { TodoComponent } from './todo-list/todo.component';
import { TodoItemComponent } from './todo-item/todo-item.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    TodoComponent,
    TodoItemComponent
  ],
  exports: [
    TodoComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TodosModule {
}
