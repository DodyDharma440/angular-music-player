import { Injectable } from '@angular/core';
import { Album } from '../models/album.model';
import {
  SearchResponse,
  SearchResult,
  SearchResults,
} from '../models/search.model';
import { Song } from '../models/song.model';
import { Playlist } from '../models/playlist.model';
import { Artist } from '../models/artist.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor() {}

  mapSearchResponse(res: SearchResponse): SearchResults {
    return {
      tracks: this.mapTracks(res.tracks?.items || []),
      playlists: this.mapPlaylists(res.playlists?.items || []),
      albums: this.mapAlbums(res.albums?.items || []),
      artists: this.mapArtists(res.artists?.items || []),
    };
  }

  mapAlbums(albums: Album[]): SearchResult[] {
    return albums.map((album) => {
      const { id, name, images, artists, total_tracks } = album;
      return {
        id,
        name,
        image: images[0]?.url,
        owner: artists.map((a) => a.name).join(', '),
        tracksCount: total_tracks,
        detailPath: ['/album', id],
      };
    });
  }

  mapTracks(tracks: Song[]): SearchResult[] {
    return tracks.map((track) => {
      const { id, name, album, artists } = track;
      return {
        id,
        name,
        image: album?.images[0]?.url || '',
        owner: artists.map((a) => a.name).join(', '),
        song: track,
      };
    });
  }

  mapArtists(artists: Artist[]): SearchResult[] {
    return artists.map((artist) => {
      const { id, name, images, followers, genres } = artist;
      return {
        id,
        name,
        owner: genres.join(', '),
        tracksCount: followers.total,
        image: images[0]?.url || '',
        isArtist: true,
        detailPath: ['/artist', id],
      };
    });
  }

  mapPlaylists(playlists: Playlist[]): SearchResult[] {
    return playlists.map((playlist) => {
      const {
        id,
        name,
        images,
        owner: { display_name },
        tracks,
      } = playlist;
      return {
        id,
        name,
        image: images[0]?.url || '',
        owner: display_name,
        tracksCount: tracks?.total,
        detailPath: ['/playlist', id],
      };
    });
  }
}
