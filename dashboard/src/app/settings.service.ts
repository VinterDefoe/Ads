import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    apiHost: string = 'http://localhost';

    clientId: string = '2';

    clientSecret: string = 'wy8qZR7s8uriNIcJk7sEmNybWDFen1LP6ebd3wON';

    grant_type: string = 'password';

    scope: string = '*';

    email: string = 'wbmarsian@gmail.com';

    password: string = '014991qq';

    name: string = 'Vinter';

    constructor() {
    }
}
