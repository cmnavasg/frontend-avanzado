import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {map} from 'rxjs/operators';

@Injectable()
export class AppService {
  // tslint:disable-next-line:variable-name
  base_url = 'http://mybackend.com/api/';
  // tslint:disable-next-line:variable-name
    tasks_endpoint = 'tasks';
  constructor(private http: Http) {}
  // Gets all tasks
  getTasks() {
    return this.http
      .get(this.base_url + this.tasks_endpoint)
      .pipe(map(res => res.json()));
  } // getTasks
// Creates a task
  createTask(task) {
    return this.http
      .post(this.base_url + this.tasks_endpoint, task)
      .pipe(map(res => res.json()));
  } // createTask
// Updates a Task
  updateTask(update) {
    return this.http
      .put(this.base_url + this.tasks_endpoint, update)
      .pipe(map(res => res.json()));
  } // updateTask
// Deletes a Task
  deleteTask(taskId) {
    return this.http
      .delete(`${this.base_url + this.tasks_endpoint}/${taskId}`)
      .pipe(map(res => res.json()));
  } // deleteTask
}
