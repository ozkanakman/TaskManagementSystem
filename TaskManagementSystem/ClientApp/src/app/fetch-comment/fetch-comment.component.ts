import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Comment } from '../models/comment';
import { TaskManagementSystemService } from '../services/taskManagementSystem.service';

@Component({
  selector: 'app-fetch-comment',
  templateUrl: './fetch-comment.component.html',
  styleUrls: ['./fetch-comment.component.scss'],
})
export class FetchCommentComponent implements OnInit {
  taskId: number = 0;
  searchString: string = '';
  public comments: Comment[] = [];
  public dataSource: Comment[] = [];

  constructor(
    private taskManagementSystemService: TaskManagementSystemService,
    private avRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.avRoute.paramMap.subscribe((params: Params) => {
      this.taskId = params.get('id');
    });
    this.getComments();
  }
  
  getComments(): void {
    this.taskManagementSystemService
      .getCommentList(this.taskId)
      .subscribe((commentData) => (this.dataSource = this.comments = commentData));
  }

  delete(id: number): void {
    const ans = confirm(
      'Do you want to delete the comment with Id: ' + id
    );
    if (ans) {
      
      this.taskManagementSystemService.deleteComment(id).subscribe(
        () => {
          this.getComments();
        },
        (error) => console.error(error)
      );
      
    }
  }

  applyFilter(filterValue: string) {

    this.comments = this.dataSource.filter((item) =>
      JSON.stringify(Object.values(item)).toLowerCase().includes(filterValue.toLowerCase())
    );
    
  }
}
