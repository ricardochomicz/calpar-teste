import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-register',
  standalone: true,
    imports: [
        FormsModule,
        RouterLink,
        ReactiveFormsModule,
        NgIf,
        NgClass
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent{

    registerForm = new FormGroup({
        name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

    constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {

    }

    register(){
        // @ts-ignore
        this.authService.register(this.registerForm.value)
            .subscribe({
                next: ((response) => {
                    this.authService.setToken(response.token);
                    this.router.navigate(['users'])
                }),
                error: ((err) => err)
            })
        return false;
    }

    get name() {
        return this.registerForm.get('name');
    }

    get email() {
        return this.registerForm.get('email');
    }

}
