import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ContactHttpService} from "../../../../services/http/contact-http.service";
import {Contact} from "../../../../models";
import {ModalComponent} from "../../../layout/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'contact-delete',
  standalone: true,
    imports: [
        ModalComponent
    ],
  templateUrl: './contact-delete.component.html',
  styleUrl: './contact-delete.component.css'
})
export class ContactDeleteComponent {

    contact!: Contact

    _contactId!: number

    @ViewChild(ModalComponent)
    modal!: ModalComponent

    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>()
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>()

    constructor(private contactHttp:ContactHttpService) {
    }

    @Input()
    set contactId(value: number) {
        this._contactId = value
        if (this._contactId) {
            this.contactHttp.get(value)
                .subscribe(contact => this.contact = contact)
        }
    }

    destroy(){
        this.contactHttp.destroy(this._contactId)
            .subscribe({
                next:(() => {
                    this.onSuccess.emit()
                    this.modal.hide()
                })
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
