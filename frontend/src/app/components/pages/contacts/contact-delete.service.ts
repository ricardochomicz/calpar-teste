import {Injectable} from "@angular/core";
import {ContactListComponent} from "./contact-list/contact-list.component";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class ContactDeleteService{

    private _contactListComponent!: ContactListComponent
    constructor(private toastr: ToastrService) {
    }

    set contactListComponent(value: ContactListComponent){
        this._contactListComponent = value
    }

    showModalDelete(contactId: number) {
        this._contactListComponent.contactId = contactId
        this._contactListComponent.contactDelete.showModal()
    }

    onDeleteSuccess($event: any) {
        this.toastr.success('Contato Excluído com sucesso!')
        this._contactListComponent.getContacts()
    }

    onDeleteError($event: HttpErrorResponse) {
        this.toastr.error('Ops! Algo deu errado.')
        console.log($event)
    }

}
