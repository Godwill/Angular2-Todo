import { Component, OnInit } from '@angular/core';
import {TodoService} from "./todo.service";
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {

  private todos;
  private activeTasks;
  private newTodo;
  private path;

  constructor(private todoService: TodoService, private route: ActivatedRoute) { }

  getTodos(query = '') {
    return this.todoService.get(query).then(todos => {
      this.todos = todos;
      this.activeTasks = this.todos.filter(todo => todo.isDone === true).length;
    });
  }

  addTodo() {
    let index = this.todos.length + 1;
    console.log(index);
    console.log(this.newTodo);
    this.todoService.add({
      title: this.newTodo,
      isDone: false,
      _id : index
    }).then(() => {
      return this.newTodo = '';
    });
  }

  updateTodo(todo, newValue) {
    todo.title = newValue;
    return this.todoService.put(todo).then(() => {
      todo.editing = false;
      return this.getTodos();
    });
  }

  destroyTodo(todo) {
    console.log(todo);
    this.todoService.delete(todo._id).then(() => {
      return this.getTodos();
    });
  }

  clearCompleted() {
    this.todoService.deleteCompleted().then(() => {
      return this.getTodos();
    });
  }

  completed(todo) {
    todo.isDone = true;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.path = params['status'];
      this.getTodos(this.path);
    });
  }

}
