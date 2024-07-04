import {Injectable} from "@angular/core";
import {ContactListComponent} from "./contact-list/contact-list.component";
import {ToastrService} from "ngx-toastr";
import {UserListComponent} from "../users/user-list/user-list.component";
import {HttpErrorResponse} from "@angular/common/http";


@Injectable({
    providedIn: 'root'
})

export class ContactInsertService{

    private _contactListComponent!: ContactListComponent

    constructor(private toastr: ToastrService) {
    }

    set contactListComponent(value: ContactListComponent){
        this._contactListComponent = value
    }

    showModalInsert() {
        this._contactListComponent.contactNew.showModal()
    }

    onInsertSuccess($event: any) {
        this.toastr.success('Contato cadastrado com sucesso!')
        this._contactListComponent.getContacts()
    }

    onInsertError($event: HttpErrorResponse) {
        this.toastr.error('Ops! Algo deu errado.')
        console.log($event)
    }
}


