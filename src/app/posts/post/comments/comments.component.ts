import { Component, OnInit, Input, ViewChild } from '@angular/core';
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
  loading = true;
  errorMessage: string;

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
    this.errorMessage = "";
  }

  getComments(postId): void {
    this.commentsService.getComments(postId)
      .subscribe(comments => {
        this.loading = false
        //comments = [];
        if (!comments || !comments.length) {
          this.errorMessage = "Sorry, there was an error loading data about comments";
        } else {
          this.comments = comments;
          this.comments.map((comment) => {
            if (comment && comment.name && comment.name.length >= 2)
              comment.avatarInitials = comment.name.substr(0, 2).toUpperCase();
            return comment;
          });
        }
      });
  }


  onClickAddComment(): void {
    if (!this.addcommentForm.valid) {
      this.errorMessage = "Empty comment: check and try again";
    } else {
      var formControls = this.addcommentForm.controls;
      var formBody = formControls.body;
      var formBodyValue = formBody.value;
      var name = this.loginService.currentUserValue.username;
      const newComment: Comment = {
        name: name,
        body: formBodyValue,
        email: "", //users' data management not mandatory (and not useful for the given template)
      } as Comment;

      this.commentsService
        .addComment(newComment, this.postId)
        .subscribe(comment => {
          //comment = null;
          if (!comment) {
            this.errorMessage = "Sorry, there was an error adding the comment";
          } else {
            this.errorMessage = "";
            if (comment && comment.name && comment.name.length >= 2)
              comment.avatarInitials = comment.name.substr(0, 2).toUpperCase();
            this.comments.push(comment)
          }
        });
    }

  }

}