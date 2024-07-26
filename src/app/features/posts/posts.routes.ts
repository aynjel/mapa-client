import { Routes } from '@angular/router';
import { PostsComponent } from './posts.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { postsResolver } from './resolver/posts.resolver';
import { postDetailsResolver } from './resolver/post-details.resolver';

export const postsRoutes: Routes = [
  {
    path: ':sectionID/posts',
    component: PostsComponent,
    title: 'Posts',
    resolve: {
      postsData: postsResolver,
    },
  },
  {
    path: ':sectionID/posts/:postID',
    component: PostDetailsComponent,
    title: 'Post Details',
    resolve: {
      postData: postDetailsResolver,
    },
  },
];
