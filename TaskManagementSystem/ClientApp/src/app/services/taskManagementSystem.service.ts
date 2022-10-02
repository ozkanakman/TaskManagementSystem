import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task';
import { User } from '../models/user';
import { Comment } from '../models/comment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskManagementSystemService {

  constructor(private http: HttpClient) { }

  getTaskList(): Observable<Task[]> {
    return this.http.get<Task[]>('TaskManagementSystem/GetTaskList');
  }

  getUserList(): Observable<User[]> {
    return this.http.get<User[]>('TaskManagementSystem/GetUserList');
  }

  getTaskData(id: number): Observable<Task> {
    return this.http.get<Task>('TaskManagementSystem/GetTask/' + id);
  }

  saveTask(task: Task): Observable<any> {
    return this.http.post('TaskManagementSystem/AddTask', task);
  }

  updateTask(task: Task): Observable<any> {
    return this.http.put('TaskManagementSystem/UpdateTask', task);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete('TaskManagementSystem/DeleteTask/' + id);
  }

  getCommentList(taskId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>('TaskManagementSystem/GetCommentList/' + taskId);
  }

  getCommentData(id: number): Observable<Comment> {
    return this.http.get<Comment>('TaskManagementSystem/GetComment/' + id);
  }

  saveComment(comment: Comment): Observable<any> {
    return this.http.post('TaskManagementSystem/AddComment', comment);
  }

  updateComment(comment: Comment): Observable<any> {
    return this.http.put('TaskManagementSystem/UpdateComment', comment);
  }

  deleteComment(id: number): Observable<any> {
    return this.http.delete('TaskManagementSystem/DeleteComment/' + id);
  }
}

