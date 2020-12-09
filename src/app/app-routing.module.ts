import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router'; 
import { AuthGuard } from './utils/auth-guard';

//main components
import { PostsComponent } from './posts/posts.component';
import { LoginComponent } from './login/login.component';
import { PostdetailComponent } from './posts/postdetail/postdetail.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent}, //free access
  { path: 'posts', component: PostsComponent, canActivate: [AuthGuard]}, //access only if AuthGuard
  { path: 'post/:id', component:  PostdetailComponent, canActivate: [AuthGuard]},  //access only if AuthGuard
  { path: '**', redirectTo: 'login'}
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
