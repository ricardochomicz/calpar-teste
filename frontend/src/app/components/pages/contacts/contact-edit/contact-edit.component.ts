import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ModalComponent} from "../../../layout/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserHttpService} from "../../../../services/http/user-http.service";
import {ContactHttpService} from "../../../../services/http/contact-http.service";
import {UserFormComponent} from "../../users/user-form/user-form.component";
import {ContactFormComponent} from "../contact-form/contact-form.component";

@Component({
  selector: 'contact-edit',
  standalone: true,
    imports: [
        ModalComponent,
        ReactiveFormsModule,
        UserFormComponent,
        ContactFormComponent
    ],
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css'
})
export class ContactEditComponent {

    @ViewChild(ModalComponent)
    modal!: ModalComponent

    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>

    contactForm: FormGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        phone: new FormControl(''),
        status: new FormControl('')
    });
    constructor(private contactHttp: ContactHttpService) {
    }

    _contactId!: number;


    @Input()
    set contactId(value: number) {
        this._contactId = value
        if (this._contactId) {
            this.contactHttp.get(value)
                .subscribe(contact => this.contactForm.patchValue(contact))
        }
    }

    submit() {
        console.log(this.contactForm.value)
        this.contactHttp.update(this._contactId, this.contactForm.value)
            .subscribe({
                next:(contact) => {
                    this.modal.hide()
                    this.onSuccess.emit(contact)
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
