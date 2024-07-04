import {Component, OnInit, ViewChild} from '@angular/core';
import {DatePipe, NgForOf} from "@angular/common";
import {User} from "../../../../models";
import {UserHttpService} from "../../../../services/http/user-http.service";
import {ModalComponent} from "../../../layout/modal/modal.component";
import {UserNewComponent} from "../user-new/user-new.component";
import {UserEditComponent} from "../user-edit/user-edit.component";
import {UserInsertService} from "../user-insert.service";
import {UserEditService} from "../user-edit.service";
import {NgxPaginationModule} from "ngx-pagination";
import {AuthService} from "../../../../services/auth.service";
import {UserSearchComponent} from "../user-search/user-search.component";

declare const $: any;
@Component({
    selector: 'user-list',
    standalone: true,

    templateUrl: './user-list.component.html',
    imports: [
        NgForOf,
        ModalComponent,
        UserNewComponent,
        DatePipe,
        UserEditComponent,
        NgxPaginationModule,
        UserSearchComponent
    ],
    styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{
    @ViewChild(UserNewComponent)
    userNew!: UserNewComponent

    @ViewChild(UserEditComponent)
    userEdit!: UserEditComponent

    // @ts-ignore
    userId: number;

    users: Array<User> = [];

    pagination ={
        page: 1,
        totalItems: 0,
        itemsPerPage: 1
    }

    searchText!: string;

    constructor(
        private userHttp: UserHttpService,
        public userInsertService: UserInsertService,
        public userEditService: UserEditService) {
        this.userInsertService.userListComponent = this;
        this.userEditService.userListComponent = this;
    }

    ngOnInit() {
        this.getUsers();
    }

    getUsers() {
        this.userHttp.list({
            page: this.pagination.page,
            search: this.searchText
        })
            .subscribe(response => {
                this.users = response.data
                this.pagination.totalItems = response.meta.total
                this.pagination.itemsPerPage = response.meta.per_page
            })
    }

    pageChanged(page: number){
        this.pagination.page = page;
        this.getUsers();
    }

    search(search: string){
        this.searchText = search;
        this.getUsers()
    }

}
