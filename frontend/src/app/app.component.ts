import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavbarComponent} from "./components/layout/navbar/navbar.component";
import 'pace-progressbar';
import 'pace-progressbar/themes/blue/pace-theme-minimal.css';
import {AuthService} from "./services/auth.service";
import {NgIf} from "@angular/common";

declare const $:any;
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, NavbarComponent, NgIf],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'frontend';

    constructor(public authService:AuthService) {
        this.configurarTooltips()
    }

    configurarTooltips() {
        $('[data-bs-toggle="tooltip"]').tooltip();
    }
}
