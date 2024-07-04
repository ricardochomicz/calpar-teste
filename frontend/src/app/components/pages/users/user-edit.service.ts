import {Injectable} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {UserListComponent} from "./user-list/user-list.component";

@Injectable({
    providedIn: 'root'
})

export class UserEditService {

    private _userListComponent!: UserListComponent
    constructor(private toastr: ToastrService) {
    }

    set userListComponent(value: UserListComponent){
        this._userListComponent = value
    }

    showModalEdit(userId: number) {
        this._userListComponent.userId = userId
        this._userListComponent.userEdit.showModal()
    }

    onEditSuccess($event: any) {
        this.toastr.success('Usuário atualizado com sucesso!')
        this._userListComponent.getUsers()
    }

    onEditError($event: HttpErrorResponse) {
        this.toastr.error('Ops! Algo deu errado.')
        console.log($event)
    }

}
