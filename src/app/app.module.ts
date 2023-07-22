import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';

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
import { NewAlbumsComponent } from './pages/home/components/new-albums/new-albums.component';
import { PlaylistsComponent } from './pages/home/components/playlists/playlists.component';
import { ShowsComponent } from './pages/home/components/shows/shows.component';
import { LikedSongsComponent } from './pages/liked-songs/liked-songs.component';
import { ContentComponent } from './components/content/content.component';
import { SongPlayerComponent } from './components/song-player/song-player.component';
import { SongListComponent } from './components/song-list/song-list.component';
import { clearState } from './utils/store';
import { rootReducer } from './stores/root.reducer';
import { PlaylistDetailComponent } from './pages/playlist/playlist-detail/playlist-detail.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { DetailLayoutComponent } from './components/detail-layout/detail-layout.component';
import { AlbumComponent } from './pages/album/album.component';
import { AlbumDetailComponent } from './pages/album/album-detail/album-detail.component';
import { PlaylistComponent } from './pages/playlist/playlist.component';
import { TopSongsComponent } from './pages/home/components/top-songs/top-songs.component';
import { CurrentSongComponent } from './pages/home/components/current-song/current-song.component';
import { TopArtistsComponent } from './pages/home/components/top-artists/top-artists.component';
import { ArtistItemComponent } from './components/artist-item/artist-item.component';
import { SearchComponent } from './pages/search/search.component';
import { SearchTabsComponent } from './pages/search/components/search-tabs/search-tabs.component';
import { searchFeature } from './pages/search/stores/search.reducer';
import { ArtistDetailComponent } from './pages/artist/artist-detail/artist-detail.component';
import { DragScrollDirective } from './directives/drag-scroll.directive';
import { CategoryDetailComponent } from './pages/categories/category-detail/category-detail.component';

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
    LikedSongsComponent,
    ContentComponent,
    SongPlayerComponent,
    SongListComponent,
    PlaylistDetailComponent,
    LoaderComponent,
    ItemCardComponent,
    DetailLayoutComponent,
    AlbumComponent,
    AlbumDetailComponent,
    PlaylistComponent,
    TopSongsComponent,
    CurrentSongComponent,
    TopArtistsComponent,
    ArtistItemComponent,
    SearchComponent,
    SearchTabsComponent,
    ArtistDetailComponent,
    DragScrollDirective,
    CategoryDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(rootReducer, { metaReducers: [clearState] }),
    StoreModule.forFeature(searchFeature),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
