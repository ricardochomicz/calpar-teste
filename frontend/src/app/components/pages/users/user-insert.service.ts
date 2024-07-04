import {Injectable} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {UserListComponent} from "./user-list/user-list.component";

@Injectable({
    providedIn: 'root'
})

export class UserInsertService {

    private _userListComponent!: UserListComponent
    constructor(private toastr: ToastrService) {
    }

    set userListComponent(value: UserListComponent){
        this._userListComponent = value
    }

    showModalInsert() {
        this._userListComponent.userNew.showModal()
    }

    onInsertSuccess($event: any) {
        this.toastr.success('Usuário cadastrado com sucesso!')
        this._userListComponent.getUsers()
    }

    onInsertError($event: HttpErrorResponse) {
        this.toastr.error('Ops! Algo deu errado.')
        console.log($event)
    }

}
