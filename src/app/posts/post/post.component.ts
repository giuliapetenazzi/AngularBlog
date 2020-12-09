import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Post } from '../post';
import { PostService } from './post.service';
import { UsersService } from '../../users/users.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  providers: [PostService, UsersService],
  styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit {
  post: Post;
  avatarInitials: string;

  constructor(
    private postService: PostService,
    private usersService: UsersService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.getPost(params.get('id'));
    });
    this.avatarInitials = "";
  }

  getPost(id): void {
    this.postService.getPost(id)
      .subscribe(post => {
        this.post = post;
        if (post) this.getUserName(post.userId);
      });
  }

  getUserName(userId: number): void {
    this.usersService.getUserName(userId).subscribe(user => {
      var name = user.username;
      this.post.userName = name;
      if (name.length >= 2) {
        this.avatarInitials = name.substr(0, 2).toUpperCase();
      }
    })
  }
}