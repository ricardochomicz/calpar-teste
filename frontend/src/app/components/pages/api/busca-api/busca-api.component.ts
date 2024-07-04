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
    selector: 'busca-api',
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
    templateUrl: './busca-api.component.html',
    styleUrl: './busca-api.component.css'
})
export class BuscaApiComponent implements OnInit {

    nomes: NameAvailable[] = [];
    busca = new FormControl('');
    nomeSelecionado: string = '';
    disponivelSelecionado!: boolean;
    noResult = false

    @Output() nomeSelecionadoChange = new EventEmitter<string>();
    @Output() disponivelSelecionadoChange = new EventEmitter<string>();
    constructor(private apiHttp: ApiHttpService) {
    }

    ngOnInit(): void {
        this.getNomes()
    }

    getNomes() {
        this.apiHttp.getNomes().subscribe(response => {
            this.nomes = response.Dados;
        });
    }


    selectName(nome: NameAvailable): void {
        this.nomeSelecionado = nome.Nome;
        this.disponivelSelecionado = nome.Disponivel;
        // @ts-ignore
        this.nomeSelecionadoChange.emit(nome);
    }

    typeaheadNoResults(event: boolean): void {
        this.noResult = event;
    }
}
