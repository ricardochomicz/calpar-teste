import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";


interface NomeDisponivel {
    Nome: string;
    Disponivel: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ApiHttpService {

    private apiUrl = 'https://09441c3d-9208-4fa9-a576-ba237af6b17c.mock.pstmn.io/';

    constructor(private http: HttpClient) { }

    getNomes(): Observable<{Dados: Array<NomeDisponivel>}> {
        return this.http.get<{Dados: Array<NomeDisponivel>}>(this.apiUrl);
    }
}
