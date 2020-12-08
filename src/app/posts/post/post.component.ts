import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Post } from '../post';
import { PostService } from './post.service';

/*
import { Comment } from './comment';
import { CommentsService } from './comments.service';
*/
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  providers: [PostService],
  styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit {
  post: Post;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.getPost(params.get('id'));
    });
  }

  getPost(id): void {
    this.postService.getPost(id)
      .subscribe(post => (this.post = post));
  }
}