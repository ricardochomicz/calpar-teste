import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";


interface NameAvailable {
    Nome: string;
    Disponivel: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ApiHttpService {

    private apiUrl = 'https://09441c3d-9208-4fa9-a576-ba237af6b17c.mock.pstmn.io/';

    constructor(private http: HttpClient) { }

    getNamesAPI(): Observable<{Dados: Array<NameAvailable>}> {
        return this.http.get<{Dados: Array<NameAvailable>}>(this.apiUrl);
    }
}
