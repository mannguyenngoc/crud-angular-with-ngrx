import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-adding-form',
  templateUrl: './adding-form.component.html',
  styleUrls: ['./adding-form.component.css']
})
export class AddingFormComponent implements OnInit {

  addForm: FormGroup | any;
  submitted = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.addForm = this.fb.group({
      name: ['', Validators.required],
    priority: [0]
    })
  }

  get addFormControl() {
    return this.addForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.addForm.valid) {
      alert('Form submitted successfully !!!')
      console.table(this.addForm.value);
    }
  }
}
