import { Injectable } from '@angular/core';
import {HttpResource, SearchParams, SearchParamsBuilder} from "./http-resource";
import {Contact} from "../../models";
import {map, Observable} from 'rxjs';
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ContactHttpService implements HttpResource<Contact> {

    private baseUrl = 'http://localhost:8000/api/contacts';
    constructor(private http: HttpClient) {
    }

    list(searchParams: SearchParams): Observable<{ data: Array<Contact>, meta: any }> {
        const sParams = new SearchParamsBuilder(searchParams).makeObject();

        const params = new HttpParams({
            fromObject: (<any>sParams)
        })
        return this.http.get <{ data: Array<Contact>, meta: any }>(this.baseUrl, {
            params,
        })
    }
    get(id: number): Observable<Contact> {
        return this.http.get <{ data: Contact }>(`${this.baseUrl}/${id}`)
            .pipe(
                map(response => response.data)
            )
    }
    create(data: Contact): Observable<Contact> {
        return this.http.post <{ data: Contact }>(this.baseUrl, data)
            .pipe(
                map(response => response.data)
            )
    }
    update(id: number, data: Contact): Observable<Contact> {
        return this.http.put <{ data: Contact }>(`${this.baseUrl}/${id}`, data)
            .pipe(
                map(response => response.data)
            )
    }
    destroy(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`)
    }
}
