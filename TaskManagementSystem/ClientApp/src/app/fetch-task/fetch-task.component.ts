import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { TaskManagementSystemService } from '../services/taskManagementSystem.service';

@Component({
  selector: 'app-fetch-task',
  templateUrl: './fetch-task.component.html',
  styleUrls: ['./fetch-task.component.scss'],
})
export class FetchTaskComponent implements OnInit {
  public tasks: Task[] = [];

  constructor(private taskManagementSystemService: TaskManagementSystemService) {}

  ngOnInit(): void {
    this.getTasks();
  }
  
  getTasks(): void {
    this.taskManagementSystemService
      .getTaskList()
      .subscribe((taskData) => (this.tasks = taskData));
  }

  delete(id: number): void {
    const ans = confirm(
      'Do you want to delete the task with Id: ' + id
    );
    if (ans) {
      this.taskManagementSystemService.deleteTask(id).subscribe(
        () => {
          this.getTasks();
        },
        (error) => console.error(error)
      );
    }
  }
}
