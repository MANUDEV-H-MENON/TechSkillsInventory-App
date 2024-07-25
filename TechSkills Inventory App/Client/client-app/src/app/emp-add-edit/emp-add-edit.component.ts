import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeServiceService } from '../employee-service.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit {
  employeeForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private _empService: EmployeeServiceService, private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
    ) { 
    
  }

  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
      name: ['', Validators.required],
      designation: ['', Validators.required],
      techstack: this.formBuilder.array([])
    });
    this.employeeForm.patchValue(this.data);
  }

  get techstack(): FormArray {
    return this.employeeForm.get('techstack') as FormArray;
  }

  addSkill() {
    const skillGroup = this.formBuilder.group({
      skill: ['', Validators.required],
      rate: ['', Validators.required]
    });
    this.techstack.push(skillGroup);
  }

  removeSkill(index: number) {
    this.techstack.removeAt(index);
  }

  onSubmit() {
    if (this.employeeForm.invalid) {
      return;
    }

    // Create the payload
    const payload = this.employeeForm.value;
    console.log(payload); // Send this payload to the backend
    if(this.data){
      this._empService.updateEmployee(this.data._id,payload).subscribe({
        next: (val: any) =>{
        console.log("employee updated successfully")
        this._dialogRef.close(true);
        },
        error:(err: any)=>{
          console.log(err); 
        }
      });
    }
    else
    {
    this._empService.addEmployee(payload).subscribe({
      next: (val: any) =>{
      console.log("employee added successfully")
      this._dialogRef.close(true);
      },
      error:(err: any)=>{
        console.log(err);
      }
    });
  }
  }
}
