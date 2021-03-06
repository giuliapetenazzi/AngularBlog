import { Component, OnInit } from '@angular/core';
import { Post } from './post';
import { PostsService } from './posts.service';
import { UsersService } from '../users/users.service';
import { LoginService } from '../login/login.service';

/** Posts components, renders the Posts page using the method getPosts
 * and the gestUsersName to show the name of the user starting from his id */

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  providers: [PostsService, UsersService],
  styleUrls: ['./posts.component.css']
})

export class PostsComponent implements OnInit {
  loading = true;
  posts: Post[];
  errorMessage: string;

  constructor(
    private postsService: PostsService,
    private usersService: UsersService,
    private loginService: LoginService,
  ) { }

  ngOnInit() {
    this.getPosts();
    this.posts = [];
    this.errorMessage = "";
  }

  getPosts(): void {
    this.postsService.getPosts()
      .subscribe(posts => {
        this.loading = false;
        //posts = [];
        if (!posts || !posts.length) {
          this.errorMessage = "Sorry, there was an error loading data about posts";
        } else {
          this.posts = posts;
          this.getUsersName(posts);
        }
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

  logout(): void {
    this.loginService.logout();
  }
}