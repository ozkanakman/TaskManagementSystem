import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DatePipe } from '@angular/common'
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Comment } from '../models/comment';
import { TaskManagementSystemService } from '../services/taskManagementSystem.service';


@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss'],
})
export class AddCommentComponent implements OnInit {
  commentForm: FormGroup;
  title = 'Create';
  id: number = 0;
  taskId: number = 0;
  errorMessage: any;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private avRoute: ActivatedRoute,
    private taskManagementSystemService: TaskManagementSystemService,
    private router: Router,
    private datepipe: DatePipe
  ) {


    this.avRoute.paramMap.subscribe((params: Params) => {
      this.id = params.get('id');
      this.taskId = params.get('taskId');
    });

    this.commentForm = this.fb.group({
      id: 0,
      taskId: this.taskId,
      dateAdded: new Date(),
      commentText: ['', [Validators.required]],
      commentType: ['', [Validators.required]],
      reminderDate: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {

    if (this.id > 0) {
      this.title = 'Edit';

      this.taskManagementSystemService.getCommentData(this.id).subscribe(
        (response: Comment) => {
          this.commentForm.setValue(
            {
              id: response.id,
              taskId: response.taskId,
              dateAdded: this.datepipe.transform(response.dateAdded, 'yyyy-MM-dd'),
              commentText: response.commentText,
              commentType: response.commentType,
              reminderDate: this.datepipe.transform(response.reminderDate, 'yyyy-MM-dd')
            });
        },
        (error) => console.error(error)
      );
      
    }
  }

  get registerFormControl() {
    return this.commentForm.controls;
  }

  save(): void {
    this.submitted = true;
    if (!this.commentForm.valid) {
      return;
    }

    if (this.id > 0) {
      this.updateComment();
    } else {
      this.addComment();
    }
  }

  cancel(): void {
    this.navigateToFetchComment();
  }

  private addComment(): void {
    
    this.taskManagementSystemService.saveComment(this.commentForm.value).subscribe(
      () => {
        this.navigateToFetchComment();
      },
      (error) => console.error(error)
    );
    
  }

  private updateComment(): void {
    this.taskManagementSystemService.updateComment(this.commentForm.value).subscribe(
      () => {
        this.navigateToFetchComment();
      },
      (error) => console.error(error)
    );
  }

  private navigateToFetchComment() {
    this.router.navigate(['/fetch-comment', this.taskId]);
  }
}
