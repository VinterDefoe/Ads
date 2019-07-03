import {EventEmitter, Injectable} from '@angular/core';
import {SettingsService} from "../settings.service";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthorisationInfo} from "../models/auth/authorisation-info";
import {User} from "../models/user";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly loginUrl: string;

    private readonly identificationByEmailUrl: string;

    constructor(private settings: SettingsService,
                private http: HttpClient,
                private router: Router) {
        this.loginUrl = this.settings.apiHost + '/oauth/token';
        this.identificationByEmailUrl = this.settings.apiHost + '/api/identification-by-email';
    }

    public login(username: string, password: string) {

        let authorisationInfo = null;

        return this.authorisation(username, password)
            .then(
                (response: AuthorisationInfo) => {
                    authorisationInfo = response;
                    return response.access_token;
                }
            )
            .then(
                (access_token) => {
                    return this.identificationByEmail(username, access_token);
                }
            )
            .then(
                (response: User) => {
                    this.setAuthorisationInfo(authorisationInfo);
                    this.setUserInfo(response);
                    this.router.navigate(['']);
                }
            )
    }

    identificationByEmail(email: string, accessToken: string) {
        let params = new HttpParams()
            .append('email', email);

        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            })
        };

        return this.http.post(this.identificationByEmailUrl, params, options).toPromise();
    }


    private authorisation(username: string, password: string) {
        let params = new HttpParams()
            .append('grant_type', this.settings.grant_type)
            .append('client_id', this.settings.clientId)
            .append('client_secret', this.settings.clientSecret)
            .append('username', username)
            .append('password', password)
            .append('scope', this.settings.scope);

        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            })
        };

        return this.http.post<AuthorisationInfo>(this.loginUrl, params, options).toPromise();
    }

    private setAuthorisationInfo(response: AuthorisationInfo) {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
        localStorage.setItem('expires_in', String(response.expires_in));
        localStorage.setItem('token_type', response.token_type);
    }

    setUserInfo(user: User) {
        localStorage.setItem('user_email', user.email);
        localStorage.setItem('user_name', user.name);
    }

    public logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('expires_in');
        localStorage.removeItem('token_type');
        localStorage.removeItem('user_email');
        localStorage.removeItem('user_name');
        this.router.navigate(['singin']);
    }

    public getToken() {
        return localStorage.getItem('access_token');
    }

    isLoggedIn() {
        return this.getToken() != null;
    }
}
