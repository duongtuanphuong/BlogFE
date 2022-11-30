import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ImageComponent } from './components/image/image.component';
import { MyPostComponent } from './components/post/my-post/my-post.component';
import { PostDetailComponent } from './components/post/post-detail/post-detail.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TestComponent } from './components/test/test.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'profile',component: ProfileComponent},
  {path:'test',component: TestComponent},
  {path:'post/:id',component:PostDetailComponent},
  {path:'my-post',component:MyPostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
