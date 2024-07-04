import {Component} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [
        RouterLink,
        RouterLinkActive
    ],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent {

    userAuthenticated: any;
    constructor(private authService: AuthService, private http: HttpClient, private router: Router) {
        this.authService.getUser().subscribe(data => {
            this.userAuthenticated = data;
        });
    }

    logout() {
        this.authService.logout()
            .subscribe( {
                next:((res) => {
                    this.router.navigate(['/login'])
                })
            })
    }
}
