// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    APIurl: "http://localhost:8080/api/v1",
    AuthUrl: "http://localhost:8080/login"
    //APIurl: "http://200.58.77.95:7014/api/v1",
    //AuthUrl: "http://200.58.77.95:7014/login"
    //APIurl: "https://simulator-patrol-emi.herokuapp.com/api/v1" 
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
