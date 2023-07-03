export const environment = {
  production: true,
  development: false,
  spotifyConfig: {
    state: 'EMEcyFUOHS',
    clientId: '5ae4dea9e7124ab1b6fd2ef5ef22eb10',
    clientSecret: 'e64dc5711a294103a59819b7e3976754',
    baseUrl: 'https://api.spotify.com/v1',
    authEndpoint: 'https://accounts.spotify.com/authorize',
    redirectUrl: 'https://angular-music-player-pi/spotify/callback',
    scope: [
      'user-read-currently-playing',
      'user-read-recently-played',
      'user-read-playback-state',
      'user-top-read',
      'user-modify-playback-state',
      'user-library-read',
      'playlist-read-private',
      'playlist-read-collaborative',
    ],
  },
};
