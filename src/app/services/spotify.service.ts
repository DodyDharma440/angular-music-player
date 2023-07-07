import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { Album, NewAlbumsResponse } from '../models/album.model';
import { LikedSongsResponse } from '../models/song.model';
import { PlaylistResponse } from '../models/playlist.model';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor(private http: HttpClient) {}

  getNewAlbums(params?: string) {
    return this.http
      .get(`/browse/new-releases?${params || ''}`)
      .pipe(map((res) => res as NewAlbumsResponse));
  }

  getAlbum(id: string) {
    return this.http.get(`/albums/${id}`).pipe(map((res) => res as Album));
  }

  getLikedSongs(params?: string) {
    return this.http
      .get(`/me/tracks?${params || ''}`)
      .pipe(map((res) => res as LikedSongsResponse));
  }

  getUserPlaylists(params?: string) {
    return this.http.get(`/me/playlists?${params || ''}`);
  }

  getFeaturedPlaylists(params?: string) {
    return this.http
      .get(`/browse/featured-playlists?${params || ''}`)
      .pipe(map((res) => res as PlaylistResponse));
  }

  getCategoryPlaylists(id: string, params?: string) {
    return this.http.get(`/browse/categories/${id}/playlists?${params || ''}`);
  }

  getPlaylist(id: string) {
    return this.http.get(`/playlists/${id}`);
  }
}
