import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Post } from './post';
import { User } from './../utils/user';
import { PostsService } from './posts.service';
import { UsersService } from '../utils/users.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  providers: [PostsService, UsersService],
  styleUrls: ['./posts.component.css']
})

export class PostsComponent implements OnInit {
  posts: Post[];

  constructor(
    private postsService: PostsService,
    private usersService: UsersService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getPosts();
    this.posts = [];
  }

  getPosts(): void {
    var me = this;
    this.postsService.getPosts()
      .subscribe(posts => {
        this.posts = posts;
        this.getUsersName(posts);
      });
  }

  getUsersName(posts: Post[]): void {
    posts.forEach((post, i) => {
      var userId = post.userId;
      this.usersService.getUserName(userId).subscribe(user => {
        var name = user.username;
        this.posts[i].userName = name;
        //to avoid multiple requests
        //a caching system should be implemented
      })
    });
  }
}