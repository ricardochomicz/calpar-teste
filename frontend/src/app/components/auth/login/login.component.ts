import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../services/auth.service";
import {Router, RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        FormsModule,
        RouterLink,
        ReactiveFormsModule,
        NgIf
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {

    loading: boolean = false;

    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

    constructor(private authService: AuthService, private router: Router) {
    }

    login() {
        this.loading = true;
        // @ts-ignore
        this.authService.login(this.loginForm.value)
            .subscribe({
                next: ((response) => {
                    this.authService.setToken(response.token);
                    this.router.navigate(['users'])
                    this.loading = false;
                }),


            })
        return false;
    }

}
