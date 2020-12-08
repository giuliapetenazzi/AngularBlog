import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { LoginComponent } from './login/login.component';
import { PostComponent } from './posts/post/post.component';
import { AuthGuard } from './utils/auth-guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent}, //free access
  { path: 'posts', component: PostsComponent, canActivate: [AuthGuard]}, //access only if AuthGuard
  { path: 'post/:id', component:  PostComponent, canActivate: [AuthGuard]},  //access only if AutGuard
  { path: '**', redirectTo: 'login'/*, pathMatch: 'full'*/}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
