import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Album, NewAlbumsResponse } from '../models/album.model';
import { LikedSongsResponse, Song } from '../models/song.model';
import { Playlist, PlaylistResponse } from '../models/playlist.model';
import { PaginationResponse } from '../models/base.model';
import { Artist } from '../models/artist.model';
import { SearchQueries, SearchResponse } from '../models/search.model';
import { CategoriesResponse, Category } from '../models/category.model';
import { serialize } from '../utils/request';

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
    return this.http.get(
      `/browse/categories/${id}/playlists?${params || ''}`
    ) as Observable<PlaylistResponse>;
  }

  getCategories(params?: string) {
    return this.http.get(
      `/browse/categories?${params || ''}`
    ) as Observable<CategoriesResponse>;
  }

  getCategory(id: string) {
    return this.http.get(`/browse/categories/${id}`) as Observable<Category>;
  }

  getPlaylist(id: string) {
    return this.http.get(`/playlists/${id}`) as Observable<Playlist>;
  }

  getArtist(id: string) {
    return this.http.get(`/artists/${id}`) as Observable<Artist>;
  }

  getArtistAlbums(id: string, params?: string) {
    return this.http.get(`/artists/${id}/albums?${params || ''}`) as Observable<
      PaginationResponse<Album>
    >;
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

  searchItems({ type, value, params }: SearchQueries) {
    return this.http.get(
      `/search?q=${value}&type=${type}&${params || ''}`
    ) as Observable<SearchResponse>;
  }

  checkIsSongSaved(ids: string[]) {
    return this.http.get(
      `/me/tracks/contains?ids=${ids.join(',')}`
    ) as Observable<boolean[]>;
  }

  saveSong(body: { ids: string[] }) {
    return this.http.put('/me/tracks', body);
  }

  unsaveSong(ids: string[]) {
    return this.http.delete(`/me/tracks?ids=${ids.join(',')}`);
  }
}
