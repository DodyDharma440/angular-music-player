import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginCallbackComponent } from './pages/login-callback/login-callback.component';
import { AuthGuard } from './helpers/auth.guard';
import { LikedSongsComponent } from './pages/liked-songs/liked-songs.component';
import { PlaylistDetailComponent } from './pages/playlist/playlist-detail/playlist-detail.component';
import { PlaylistComponent } from './pages/playlist/playlist.component';
import { AlbumDetailComponent } from './pages/album/album-detail/album-detail.component';
import { AlbumComponent } from './pages/album/album.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'spotify/callback',
    component: LoginCallbackComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'liked-songs',
    component: LikedSongsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'playlist',
    component: PlaylistComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'playlist/:id',
    component: PlaylistDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'album',
    component: AlbumComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'album/:id',
    component: AlbumDetailComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
