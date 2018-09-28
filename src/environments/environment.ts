// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCor5aXTqRWexy5oyQbS4pG0UZly7QfIiU",
    authDomain: "entry-egress.firebaseapp.com",
    databaseURL: "https://entry-egress.firebaseio.com",
    projectId: "entry-egress",
    storageBucket: "entry-egress.appspot.com",
    messagingSenderId: "932823900425"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
