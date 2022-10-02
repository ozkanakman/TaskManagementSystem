import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DatePipe } from '@angular/common'
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Task } from '../models/task';
import { User } from '../models/user';
import { TaskManagementSystemService } from '../services/taskManagementSystem.service';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  taskForm: FormGroup;
  title = 'Create';
  id: number = 0;
  errorMessage: any;
  submitted = false;

  userList$: Observable<User[]>;

  constructor(
    private fb: FormBuilder,
    private avRoute: ActivatedRoute,
    private taskManagementSystemService: TaskManagementSystemService,
    private router: Router,
    private datepipe: DatePipe
  ) {
    this.userList$ = this.taskManagementSystemService.getUserList();

    this.taskForm = this.fb.group({
      id: 0,
      createDate: new Date(),
      taskStatus: ['', [Validators.required]],
      taskType: ['', [Validators.required]],
      requiredByDate: ['', [Validators.required]],
      taskDescription: ['', [Validators.required]],
      assignedUser: ['', [Validators.required]],
      nextActionDate: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.avRoute.paramMap.subscribe((params: Params) => {
      this.id = params.get('id');
    });

    if (this.id > 0) {
      this.title = 'Edit';

      this.taskManagementSystemService.getTaskData(this.id).subscribe(
        (response: Task) => {
          this.taskForm.setValue(
            {
              id: response.id,
              createDate: this.datepipe.transform(response.createDate, 'yyyy-MM-dd'),
              requiredByDate: this.datepipe.transform(response.requiredByDate, 'yyyy-MM-dd'),
              taskDescription: response.taskDescription,
              taskStatus: response.taskStatus,
              taskType: response.taskType,
              assignedUser: response.assignedUser,
              nextActionDate: this.datepipe.transform(response.nextActionDate, 'yyyy-MM-dd')
            });
        },
        (error) => console.error(error)
      );
      
    }
  }

  get registerFormControl() {
    return this.taskForm.controls;
  }

  save(): void {
    this.submitted = true;
    if (!this.taskForm.valid) {
      return;
    }

    if (this.id > 0) {
      this.updateTask();
    } else {
      this.addTask();
    }
  }

  cancel(): void {
    this.navigateToFetchTask();
  }

  private addTask(): void {
    
    this.taskManagementSystemService.saveTask(this.taskForm.value).subscribe(
      () => {
        this.navigateToFetchTask();
      },
      (error) => console.error(error)
    );
    
  }

  private updateTask(): void {
    this.taskManagementSystemService.updateTask(this.taskForm.value).subscribe(
      () => {
        this.navigateToFetchTask();
      },
      (error) => console.error(error)
    );
  }

  private navigateToFetchTask() {
    this.router.navigate(['']);
  }
}
