import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeServiceService } from './employee-service.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'client-app';
  displayedColumns: string[] = ['id', 'name', 'designation', 'skill', 'Action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _dialog: MatDialog, private _empService: EmployeeServiceService)
  {

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnInit(): void {
    this.getEmployeeList();
  }

  openAddEditEmployeeForm()
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '70%'; // Set the desired width as a percentage
    dialogConfig.height = '70%'; // Set the desired height as a percentage
    const dialog= this._dialog.open(EmpAddEditComponent, dialogConfig)
    dialog.afterClosed().subscribe({
      next: (val: any) =>{
        if(val){
          this.getEmployeeList();
        }
      }
    })
  }

  getEmployeeList()
  {
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.width = '70%'; // Set the desired width as a percentage
    // dialogConfig.height = '70%'; // Set the desired height as a percentage
    // this._dialog.open(EmpAddEditComponent, dialogConfig)
    this._empService.getEmployee().subscribe({
      next: (res)=>{
        console.log(res)
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
      },
      error: (err)=>{
        console.log(err)
      }
    })
  }

  deleteEmployee(id:any){
    this._empService.deleteEmployee(id).subscribe({
      next: (res)=>{
        console.log('employee deleted');
        this._empService.getEmployee();
      },
      error: console.log
    })
  }

  openEditForm(data:any)
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '70%'; // Set the desired width as a percentage
    dialogConfig.height = '70%'; // Set the desired height as a percentage
    const dialog= this._dialog.open(EmpAddEditComponent,{
      data,
    })
    dialog.afterClosed().subscribe({
      next: (val: any) =>{
        if(val){
          this.getEmployeeList();
        }
      }
    })
  }
}
