import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, tap} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8000/api';
    private loggedIn = false;

    constructor(private http: HttpClient) {
        this.loadToken();
    }

    login(user: { email: string, password: string }): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/login`, user)
            .pipe(
                tap(() => this.loggedIn = true)
            );
    }

    setToken(token: string): void {
       return localStorage.setItem('token', token);
    }

    private loadToken() {
        const token = localStorage.getItem('token');
        this.loggedIn = !!token;
    }

    getUser(): Observable<any> {
        const token = localStorage.getItem('token')
        return this.http.get<any>(`${this.apiUrl}/user`,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
            .pipe(
                tap(user => this.loggedIn = !!user)
        );
    }

    isLoggedIn(): boolean {
        return this.loggedIn;
    }



    register(user: { name: string, email: string, password: string }): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/register`, user)
            .pipe(
                tap(() => this.loggedIn = true)
            );
    }

    logout(): Observable<any> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        return this.http.post<any>(`${this.apiUrl}/logout`, {}, { headers }).pipe(
            tap(() => {
                this.loggedIn = false;
                localStorage.removeItem('token');
            })
        );
    }

}
