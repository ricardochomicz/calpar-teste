import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {SearchApiComponent} from "../../api/search-api/search-api.component";
import {NgxMaskDirective} from "ngx-mask";

@Component({
  selector: 'contact-form',
  standalone: true,
    imports: [
        NgIf,
        ReactiveFormsModule,
        NgClass,
        SearchApiComponent,
        NgxMaskDirective
    ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {

    nameSelectedSearch!: string;
    availableSelected!: boolean;
    constructor(private changeRef: ChangeDetectorRef) {
    }
    @Input()
    contactForm!: FormGroup;


    ngOnChanges(){
        this.changeRef.detectChanges()
    }

    nameSelected(event: any){
        this.nameSelectedSearch = event.Nome
        this.availableSelected = event.Disponivel
        this.contactForm.get('name')?.setValue(event.Nome);
        this.contactForm.get('status')?.setValue(event.Disponivel);
    }

}
