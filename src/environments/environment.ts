// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appUrl: 'http://213.57.171.199:30120',
  firebase: {
    apiKey: "AIzaSyAGI20pwFF9seMovFRKPCv9E08c--kNGYY",
    authDomain: "guessmyword-cae56.firebaseapp.com",
    projectId: "guessmyword-cae56",
    storageBucket: "guessmyword-cae56.appspot.com",
    messagingSenderId: "45512826786",
    appId: "1:45512826786:web:abadd2798c0af24870dcfb",
    measurementId: "G-8RY76PLK19"
  },
  languages: [
    {
      value: 'hebrew',
      display: 'עברית'
     },
     {
      value: 'english',
      display: 'English'
     }
    ],
  defaultLanguage: {
    value: 'hebrew',
    display: 'עברית'
   }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 * {
    apiKey: 'AIzaSyAGI20pwFF9seMovFRKPCv9E08c--kNGYY',
    authDomain: 'guessmyword-cae56.firebaseapp.com',
    databaseURL: '<your-database-URL>',
    projectId: 'guessmyword-cae56',
    storageBucket: 'guessmyword-cae56.appspot.com',
    messagingSenderId: '45512826786'
  }
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
