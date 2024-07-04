import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'user-form',
  standalone: true,
    imports: [
        NgIf,
        ReactiveFormsModule,
        NgClass
    ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {

    constructor(private changeRef: ChangeDetectorRef) {
    }
    @Input()
    userForm!: FormGroup;


    ngOnChanges(){
        this.changeRef.detectChanges()
    }

}
