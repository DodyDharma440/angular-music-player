import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor(private http: HttpClient) {}

  getNewAlbums(params?: string) {
    return this.http.get(
      `/browse/new-releases?country=ID&offset=0${params || ''}`
    );
  }

  getLikedSongs(params?: string) {
    return this.http.get(`/me/tracks?${params || ''}`);
  }
}
