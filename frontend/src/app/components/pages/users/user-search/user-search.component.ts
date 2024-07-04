import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'user-search',
  standalone: true,
    imports: [
        FormsModule
    ],
  templateUrl: './user-search.component.html',
  styleUrl: './user-search.component.css'
})
export class UserSearchComponent {

    search!: "";

    @Output()
    onSearch: EventEmitter<string> = new EventEmitter<string>()

    submit(){
        this.onSearch.emit(this.search)
        return false;
    }

}
