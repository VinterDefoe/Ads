import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-singin',
    templateUrl: './singin.component.html',
    styleUrls: ['./singin.component.scss']
})
export class SinginComponent implements OnInit {
    email = new FormControl('', [Validators.required, Validators.email]);
    password = new FormControl('', [Validators.required, Validators.min(6)]);
    signupForm: FormGroup;

    hide = true;

    constructor(private authService: AuthService, private router: Router) {
    }

    ngOnInit() {
        this.signupForm = new FormGroup({
            'email': this.email,
            'password': this.password
        });
    }

    getEmailErrorMessage() {
        return this.email.hasError('required') ? 'You must enter a email' :
            this.email.hasError('email') ? 'Not a valid email' :
                '';
    }
    getPasswordErrorMessage() {
        return this.password.hasError('required') ? 'You must enter a password' :
            this.password.hasError('min') ? 'Min length 6 characters' :
                '';
    }
    getErrorMessage(error: string){
        return error;
    }

    private login(username: string, password: string) {
            this.authService.login(username, password)
                .catch(
                    (error) => {
                        console.log(error);
                    }
                );
    }


    onSubmit() {
        this.login(this.signupForm.value.email, this.signupForm.value.password);
    }
}
