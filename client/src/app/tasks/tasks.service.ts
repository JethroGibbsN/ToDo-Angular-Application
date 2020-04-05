import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";

import { Task } from "./task";
import { HttpErrorHandler, HandleError } from "../http-error-handler.service";

@Injectable()
export class TasksService {
  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError("TasksService");
  }

  getTasks(): Observable<Task[]> {
    return this.http
      .get<Task[]>("/tasks")
      .pipe(catchError(this.handleError("getTasks", [])));
  }
  getTask(task: Task): Observable<Task>{
    return this.http
    .get<Task>(`/tasks/${task.taskName}`)
    
  }
  addTask(task: FormData): Observable<Task> {
    return this.http
      .post<Task>("/tasks", task)
  }

  deleteTask(taskName: string): Observable<{}> {
    const url = `/tasks/${taskName}`;
    return this.http
      .delete(url)
      .pipe(catchError(this.handleError("deleteTask")));
  }

  updateTask(task: Task): Observable<Task> {
    return this.http
      .put<Task>(`/tasks/${task.taskName}`, task)
      .pipe(catchError(this.handleError("updateTask", task)));
  }

}