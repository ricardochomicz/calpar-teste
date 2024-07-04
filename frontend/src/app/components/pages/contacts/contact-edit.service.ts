import {Injectable} from "@angular/core";
import {UserListComponent} from "../users/user-list/user-list.component";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {ContactListComponent} from "./contact-list/contact-list.component";


@Injectable({
    providedIn: 'root'
})

export class ContactEditService{

    private _contactListComponent!: ContactListComponent
    constructor(private toastr: ToastrService) {
    }

    set contactListComponent(value: ContactListComponent){
        this._contactListComponent = value
    }

    showModalEdit(contactId: number) {
        this._contactListComponent.contactId = contactId
        this._contactListComponent.contactEdit.showModal()
    }

    onEditSuccess($event: any) {
        this.toastr.success('Contato atualizado com sucesso!')
        this._contactListComponent.getContacts()
    }

    onEditError($event: HttpErrorResponse) {
        this.toastr.error('Ops! Algo deu errado.')
        console.log($event)
    }

}
