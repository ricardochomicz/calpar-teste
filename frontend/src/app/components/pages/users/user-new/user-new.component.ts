import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ModalComponent} from "../../../layout/modal/modal.component";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {User} from "../../../../models";
import {UserHttpService} from "../../../../services/http/user-http.service";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'user-new',
  standalone: true,
    imports: [
        FormsModule,
        ModalComponent,
        ReactiveFormsModule,
        NgIf,
        NgClass
    ],
  templateUrl: './user-new.component.html',
  styleUrl: './user-new.component.css'
})
export class UserNewComponent {

    @ViewChild(ModalComponent)
    modal!: ModalComponent

    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>()

    userForm: FormGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
    constructor(private userHttp: UserHttpService) {
    }

    submit(){
        console.log(this.userForm.value)
        this.userHttp.create(this.userForm.value)
            .subscribe({
                next:(user) => {
                    this.userForm.reset()
                    this.modal.hide()
                    this.onSuccess.emit(user)
                },
                error:(error) => this.onError.emit(error)
            })
    }

    showModal(){
        this.modal.show()
    }

    hideModal(event: any){
        this.modal.hide()
    }

}
