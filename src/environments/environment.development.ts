export const environment = {
  production: false,
  development: true,
  spotifyConfig: {
    state: 'EMEcyFUOHS',
    clientId: '5ab84e6189ef4b86abad536475ed63a1',
    clientSecret: '84e0cd2b0d8f45699f8058aac3a3ecf4',
    baseUrl: 'https://api.spotify.com/v1',
    authEndpoint: 'https://accounts.spotify.com/authorize',
    redirectUrl: 'http://localhost:4200/spotify/callback',
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
