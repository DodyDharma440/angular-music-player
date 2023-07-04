import { likedSongsReducer } from './liked-songs.reducer';
import { playlistReducer } from './playlist.reducer';
import { songReducer } from './song.reducer';
import { userReducer } from './user.reducer';

export const rootReducer = {
  user: userReducer,
  song: songReducer,
  likedSongs: likedSongsReducer,
  playlists: playlistReducer,
};
