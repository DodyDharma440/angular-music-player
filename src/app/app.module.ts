import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageLayoutComponent } from './components/page-layout/page-layout.component';
import { SidebarComponent } from './components/page-layout/sidebar/sidebar.component';
import { HomeComponent } from './pages/home/home.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginCallbackComponent } from './pages/login-callback/login-callback.component';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './stores/user.reducer';
import { NewAlbumsComponent } from './pages/home/components/new-albums/new-albums.component';
import { PlaylistsComponent } from './pages/home/components/playlists/playlists.component';
import { ShowsComponent } from './pages/home/components/shows/shows.component';
import { AlbumCardComponent } from './components/album-card/album-card.component';
import { LikedSongsComponent } from './pages/liked-songs/liked-songs.component';
import { ContentComponent } from './components/content/content.component';
import { songsReducer } from './stores/song.reducer';
import { SongPlayerComponent } from './components/song-player/song-player.component';

@NgModule({
  declarations: [
    AppComponent,
    PageLayoutComponent,
    SidebarComponent,
    HomeComponent,
    CategoriesComponent,
    LoginComponent,
    LoginCallbackComponent,
    NewAlbumsComponent,
    PlaylistsComponent,
    ShowsComponent,
    AlbumCardComponent,
    LikedSongsComponent,
    ContentComponent,
    SongPlayerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      user: userReducer,
      songs: songsReducer,
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
