import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../services/auth.service";
import {Router, RouterLink} from "@angular/router";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        FormsModule,
        RouterLink,
        ReactiveFormsModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {

    loginForm = new FormGroup({
        email: new FormControl('ricardo@email.com', [Validators.required, Validators.email]),
        password: new FormControl('password', [Validators.required, Validators.minLength(6)])
    });

    constructor(private authService: AuthService, private router: Router) {
    }

    login() {
        // @ts-ignore
        this.authService.login(this.loginForm.value)
            .subscribe({
                next: ((response) => {
                    this.authService.setToken(response.token);
                    this.router.navigate(['users'])
                }),

            })
        return false;
    }

}
