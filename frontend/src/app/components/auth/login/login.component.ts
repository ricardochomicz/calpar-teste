import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../services/auth.service";
import {Router, RouterLink} from "@angular/router";
import {NgClass, NgIf} from "@angular/common";
import {AlertModule} from "ngx-bootstrap/alert";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        FormsModule,
        RouterLink,
        ReactiveFormsModule,
        NgIf,
        AlertModule,
        NgClass
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {

    loading: boolean = false;
    msgErroLogin!: string;

    loginForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

    constructor(private authService: AuthService, private router: Router) {
    }

    login() {
        this.loading = true;
        this.authService.login(this.loginForm.value)
            .subscribe({
                next: ((response) => {
                    this.authService.setToken(response.token);
                    this.router.navigate(['users'])
                    this.loading = false;
                }),
                error:((err) => {
                    console.log(err.error.error)
                    this.msgErroLogin = err.error.error
                    this.loading = false;
                })


            })
        return false;
    }

}
