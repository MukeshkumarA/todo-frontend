import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
// import { environment } from '../environment/environment-prod';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private url = environment.apiUrl;
  private apiUrl = this.url + '/api/tasks';
  constructor(private httpClient: HttpClient) {

   }

   createTask(newTask: Task): Observable<Task> {
      return this.httpClient.post<Task>(this.apiUrl, newTask);
   }

   getAllTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.apiUrl);
   }

   updateTask(taskId: number, updatedTask: Task): Observable<Task> {
      return this.httpClient.put<Task>(this.apiUrl+'/'+taskId, updatedTask);
   }

   deleteTask(taskId: number) {
      return this.httpClient.delete(this.apiUrl+'/'+taskId);
   }

}
