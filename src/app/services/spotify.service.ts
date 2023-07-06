import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { Album } from '../models/album.model';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor(private http: HttpClient) {}

  private wrapType<T>(observer: Observable<Object>) {
    return observer.pipe(map((value) => value as T));
  }

  getNewAlbums(params?: string) {
    return this.http.get(
      `/browse/new-releases?country=ID&offset=0${params || ''}`
    );
  }

  getAlbum(id: string) {
    return this.wrapType<Album>(this.http.get(`/albums/${id}`));
  }

  getLikedSongs(params?: string) {
    return this.http.get(`/me/tracks?${params || ''}`);
  }

  getUserPlaylists(params?: string) {
    return this.http.get(`/me/playlists?${params || ''}`);
  }

  getFeaturedPlaylists(params?: string) {
    return this.http.get(`/browse/featured-playlists?${params || ''}`);
  }

  getCategoryPlaylists(id: string, params?: string) {
    return this.http.get(`/browse/categories/${id}/playlists?${params || ''}`);
  }

  getPlaylist(id: string) {
    return this.http.get(`/playlists/${id}`);
  }
}
