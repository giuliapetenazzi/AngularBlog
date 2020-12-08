import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Comment } from './comment';
import { CommentsService } from './comments.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  providers: [CommentsService],
  styleUrls: ['./comments.component.css']
})

export class CommentsComponent implements OnInit {
  addcommentForm: FormGroup;
  comments: Comment[];
  
  @Input() postId: number;

  constructor(
    private commentsService: CommentsService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log('init di CommentsComponent', this, this.postId);
    this.getComments(this.postId);
  }

  getComments(postId): void {
    this.commentsService.getComments(postId)
      .subscribe(comments => (this.comments = comments));
  }

  onClickAddComment(): void {
    var formControls = this.addcommentForm.controls;
    var formName = formControls.username.value;
    var formBody = formControls.username.value;

    const newComment: Comment = {
      name: formName,
      body: formBody,
      email: "test",
    } as Comment;
    this.commentsService
      .addComment(newComment, this.postId)
      .subscribe(comment => this.comments.push(comment));
  }

}