import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ModalComponent} from "../../../layout/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {UserHttpService} from "../../../../services/http/user-http.service";
import {NgClass, NgIf} from "@angular/common";
import {UserFormComponent} from "../user-form/user-form.component";

@Component({
    selector: 'user-edit',
    standalone: true,
    imports: [
        FormsModule,
        ModalComponent,
        ReactiveFormsModule,
        NgIf,
        NgClass,
        UserFormComponent
    ],
    templateUrl: './user-edit.component.html',
    styleUrl: './user-edit.component.css'
})
export class UserEditComponent {

    @ViewChild(ModalComponent)
    modal!: ModalComponent

    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>

    userForm: FormGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('')
    });
    constructor(private userHttp: UserHttpService) {
    }

    _userId!: number;


    @Input()
    set userId(value: number) {
        this._userId = value
        if (this._userId) {
            this.userHttp.get(value)
                .subscribe(user => this.userForm.patchValue(user))
        }
    }

    submit() {
        console.log(this.userForm.value)
        this.userHttp.update(this._userId, this.userForm.value)
            .subscribe({
                next:(user) => {
                    this.modal.hide()
                    this.onSuccess.emit(user)
                },
                error:(error) => {
                    this.onError.emit(error)
                }
            })
    }

    showModal() {
        setTimeout(() => {
            this.modal.show()
        }, 500)

    }

    hideModal($event: Event) {

    }
}
