import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'contact-search',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './contact-search.component.html',
  styleUrl: './contact-search.component.css'
})
export class ContactSearchComponent {

    search!: "";

    @Output()
    onSearch: EventEmitter<string> = new EventEmitter<string>()

    submit(){
        this.onSearch.emit(this.search)
        return false;
    }

}
