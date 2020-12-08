import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Comment } from './comment';
import { CommentsService } from './comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  providers: [CommentsService],
  styleUrls: ['./comments.component.css']
})

export class CommentsComponent implements OnInit {
  comments: Comment[];
  
  @Input() postId: number;

  constructor(
    private commentsService: CommentsService,
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

}