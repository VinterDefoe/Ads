import {Injectable, OnInit} from '@angular/core';
import Echo from 'laravel-echo';
import Io from 'socket.io-client';
import {AuthService} from "./auth.service";
import {SettingsService} from "../settings.service";

@Injectable({
    providedIn: 'root'
})
export class EchoService implements OnInit {

    constructor(private authService: AuthService,
                private settingsService: SettingsService) {
        window['io'] = Io;
        this.echo = window['echo'] = new Echo({
            client: Io,
            broadcaster: 'socket.io',
            host: this.settingsService.apiHost+ ':6001',
            // path:'/ws',
            // auth: {headers:{'Authorization': 'Bearer '+ this.authService.getToken()}}
        });
    }

    public echo: Echo;

    ngOnInit(): void {

    }


}
