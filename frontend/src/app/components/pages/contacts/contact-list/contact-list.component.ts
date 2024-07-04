import {Component, OnInit, ViewChild} from '@angular/core';
import {UserNewComponent} from "../../users/user-new/user-new.component";
import {ContactNewComponent} from "../contact-new/contact-new.component";
import {Contact, User} from "../../../../models";
import {UserHttpService} from "../../../../services/http/user-http.service";
import {UserInsertService} from "../../users/user-insert.service";
import {UserEditService} from "../../users/user-edit.service";
import {ContactHttpService} from "../../../../services/http/contact-http.service";
import {ContactInsertService} from "../contact-insert.service";
import {ContactEditComponent} from "../contact-edit/contact-edit.component";
import {ContactEditService} from "../contact-edit.service";
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {UserEditComponent} from "../../users/user-edit/user-edit.component";
import {UserSearchComponent} from "../../users/user-search/user-search.component";
import {ContactSearchComponent} from "../contact-search/contact-search.component";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {ContactDeleteComponent} from "../contact-delete/contact-delete.component";
import {ContactDeleteService} from "../contact-delete.service";

@Component({
    selector: 'contact-list',
    standalone: true,
    imports: [
        DatePipe,
        NgForOf,
        NgxPaginationModule,
        UserEditComponent,
        UserNewComponent,
        UserSearchComponent,
        ContactNewComponent,
        ContactEditComponent,
        ContactSearchComponent,
        TooltipModule,
        NgClass,
        NgIf,
        ContactDeleteComponent
    ],
    templateUrl: './contact-list.component.html',
    styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit{

    @ViewChild(ContactNewComponent)
    contactNew!: ContactNewComponent

    @ViewChild(ContactEditComponent)
    contactEdit!: ContactEditComponent

    @ViewChild(ContactDeleteComponent)
    contactDelete!: ContactDeleteComponent

    loading: boolean = false

    // @ts-ignore
    contactId: number;

    contacts: Array<Contact> = [];

    pagination ={
        page: 1,
        totalItems: 0,
        itemsPerPage: 1
    }

    searchText!: string;


    constructor(
        private contactHttp: ContactHttpService,
        public contactInsertService: ContactInsertService,
        public contactEditService: ContactEditService,
        public contactDeleteService: ContactDeleteService) {
        this.contactInsertService.contactListComponent = this;
        this.contactEditService.contactListComponent = this;
        this.contactDeleteService.contactListComponent = this;
    }

    ngOnInit() {
        this.getContacts();
    }

    getContacts() {
        this.loading = true
        this.contactHttp.list({
            page: this.pagination.page,
            search: this.searchText
        })
            .subscribe(response => {
                this.contacts = response.data
                this.pagination.totalItems = response.meta.total
                this.pagination.itemsPerPage = response.meta.per_page
                this.loading = false
            })
    }

    pageChanged(page: number){
        this.pagination.page = page;
        this.getContacts();
    }

    search(search: string){
        this.searchText = search;
        this.getContacts()
    }
}
