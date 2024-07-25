import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  constructor(private _http: HttpClient) { }

  addEmployee(data:any):Observable<any>
  {
    return this._http.post('Backend_URL/api/employee',data)
  }

  updateEmployee(id:any, data:any):Observable<any>
  {
    return this._http.put(`Backend_URL/api/employee/${id}`,data)
  }

  getEmployee():Observable<any>
  {
    return this._http.get('Backend_URL/api/employee')
  }

  deleteEmployee(id:any):Observable<any>
  {
    return this._http.delete(`Backend_URL/api/employee/${id}`)
  }
}
