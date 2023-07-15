import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Album, NewAlbumsResponse } from '../models/album.model';
import { LikedSongsResponse, Song } from '../models/song.model';
import { Playlist, PlaylistResponse } from '../models/playlist.model';
import { PaginationResponse } from '../models/base.model';
import { Artist } from '../models/artist.model';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor(private http: HttpClient) {}

  getNewAlbums(params?: string) {
    return this.http.get(
      `/browse/new-releases?${params || ''}`
    ) as Observable<NewAlbumsResponse>;
  }

  getAlbum(id: string) {
    return this.http.get(`/albums/${id}`) as Observable<Album>;
  }

  getLikedSongs(params?: string) {
    return this.http.get(
      `/me/tracks?${params || ''}`
    ) as Observable<LikedSongsResponse>;
  }

  getUserPlaylists(params?: string) {
    return this.http.get(`/me/playlists?${params || ''}`);
  }

  getFeaturedPlaylists(params?: string) {
    return this.http.get(
      `/browse/featured-playlists?${params || ''}`
    ) as Observable<PlaylistResponse>;
  }

  getCategoryPlaylists(id: string, params?: string) {
    return this.http.get(`/browse/categories/${id}/playlists?${params || ''}`);
  }

  getPlaylist(id: string) {
    return this.http.get(`/playlists/${id}`) as Observable<Playlist>;
  }

  getUserTopSongs(params?: string) {
    return this.http.get(`/me/top/tracks?${params}`) as Observable<
      PaginationResponse<Song>
    >;
  }

  getUserTopArtists(params?: string) {
    return this.http.get(`/me/top/artists?${params}`) as Observable<
      PaginationResponse<Artist>
    >;
  }
}
