import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ApiHttpService} from "../../../../services/http/api-http.service";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {FilterPipe} from "../../../../pipes/filter.pipe";
import {TypeaheadModule} from "ngx-bootstrap/typeahead";
import {AlertModule} from "ngx-bootstrap/alert";

interface NameAvailable {
    Nome: string;
    Disponivel: boolean;
}

@Component({
    selector: 'search-api',
    standalone: true,
    imports: [
        FormsModule,
        NgForOf,
        FilterPipe,
        ReactiveFormsModule,
        TypeaheadModule,
        NgIf,
        AlertModule
    ],
    templateUrl: './search-api.component.html',
    styleUrl: './search-api.component.css'
})
export class SearchApiComponent implements OnInit {

    names: NameAvailable[] = [];
    search = new FormControl('');
    nameSelected: string = '';
    availableSelected!: boolean;
    noResult = false

    @Output() nameSelectedChange = new EventEmitter<string>();
    @Output() availableSelectedChange = new EventEmitter<string>();
    constructor(private apiHttp: ApiHttpService) {
    }

    ngOnInit(): void {
        this.getNames()
    }

    getNames() {
        this.apiHttp.getNamesAPI().subscribe(response => {
            this.names = response.Dados;
        });
    }


    selectName(nome: NameAvailable): void {
        this.nameSelected = nome.Nome;
        this.availableSelected = nome.Disponivel;
        // @ts-ignore
        this.nameSelectedChange.emit(nome);
    }

    typeaheadNoResults(event: boolean): void {
        this.noResult = event;
    }
}
