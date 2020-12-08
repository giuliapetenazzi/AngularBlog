import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Comment } from './comment';
import { CommentsService } from './comments.service';
import { LoginService } from '../../../login/login.service';

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
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.getComments(this.postId);
    this.addcommentForm = this.formBuilder.group({
      body: ['', Validators.required]
    });

  }

  getComments(postId): void {
    this.commentsService.getComments(postId)
      .subscribe(comments => (this.comments = comments));
  }

  onClickAddComment(): void {
    var formControls = this.addcommentForm.controls;
    var formBody = formControls.body.value;
    var name = this.loginService.currentUserValue.username;
    const newComment: Comment = {
      name: name,
      body: formBody,
      email: "", //users' data management not mandatory (and not useful for the given template)
    } as Comment;

    console.log("sto per mandare", newComment, this.postId);
    this.commentsService
      .addComment(newComment, this.postId)
      .subscribe(comment => this.comments.push(comment));
  }

}