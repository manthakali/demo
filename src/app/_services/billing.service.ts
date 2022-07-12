import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Billing } from '../_models/billing';

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  private apiServerUrl='http://localhost:8080/billing';
    
  constructor(private http:HttpClient) { }

  public getAllBilling():Observable<Billing[]>{
    return this.http.get<Billing[]>(`${this.apiServerUrl}/bills`);
  }
  public getBillById(billId:number):Observable<Billing>{
    return this.http.get<Billing>(`${this.apiServerUrl}/${billId}`);
  }
  public createBill(billing:Billing):Observable<Billing>{
    return this.http.post<Billing>(`${this.apiServerUrl}/create`,billing);
  }
  public updateBill(billing:Billing):Observable<Billing>{
    return this.http.put<Billing>(`${this.apiServerUrl}/update`,billing);
  }
  public deleteBill(billId:number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/delete/${billId}`);
  }
  
}
