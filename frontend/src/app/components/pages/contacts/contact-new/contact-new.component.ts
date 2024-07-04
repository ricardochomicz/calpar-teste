import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {ModalComponent} from "../../../layout/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserHttpService} from "../../../../services/http/user-http.service";
import {ContactFormComponent} from "../contact-form/contact-form.component";
import {ContactHttpService} from "../../../../services/http/contact-http.service";

@Component({
    selector: 'contact-new',
    standalone: true,
    imports: [
        ContactFormComponent,
        ModalComponent,
        ReactiveFormsModule
    ],
    templateUrl: './contact-new.component.html',
    styleUrl: './contact-new.component.css'
})
export class ContactNewComponent {

    @ViewChild(ModalComponent)
    modal!: ModalComponent

    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>()

    contactForm: FormGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        phone: new FormControl(''),
        status: new FormControl('')
    });

    constructor(private contactHttp: ContactHttpService) {
    }

    submit() {
        console.log(this.contactForm.value)
        this.contactHttp.create(this.contactForm.value)
            .subscribe({
                next: (user) => {
                    this.contactForm.reset()
                    this.modal.hide()
                    this.onSuccess.emit(user)
                },
                error: (error) => this.onError.emit(error)
            })
    }

    showModal() {
        this.modal.show()
    }

    hideModal(event: any) {
        this.contactForm.reset()
        this.modal.hide()
    }


}
