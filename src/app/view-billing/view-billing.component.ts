import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BillingService } from 'src/app/_services/billing.service';
import { Billing } from '../_models/billing';

@Component({
  selector: 'app-view-billing',
  templateUrl: './view-billing.component.html',
  styleUrls: ['./view-billing.component.css']
})


  export class ViewBillingComponent implements OnInit {
    public billings: Billing[] = [];
    
  
    constructor(private billingService: BillingService) {
  
    }
    ngOnInit() {
      this.getAllBillings();
    }
    public getAllBillings(): void {
      this.billingService.getAllBilling().subscribe({
        next: (response: Billing[]) => {
          this.billings = response;
          console.log(this.billings);
          
  
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      });
    }
  

}
