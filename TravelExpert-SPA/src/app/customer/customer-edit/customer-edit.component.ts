import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Customer } from 'src/app/_models/Customer';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';
import { CustomerService } from 'src/app/_services/customer.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  @ViewChild('editForm', {static:true}) editForm: NgForm;
  customer: Customer;
  selectedCountry;
  countries = ["Canada", "USA"];
  @HostListener('window:beforeunload',['$event'])
  unloadNotification($event: any){
    if(this.editForm.dirty){
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
    private authService: AuthService, private customerService: CustomerService) { }

  ngOnInit() {
    this.route.data.subscribe(data=>{
      this.customer = data['Customer'];
      this.selectedCountry = this.customer.custCountry;
    });
    this.loadScript("../assets/scripts/customer-edit.component.js");
  }

  updateCustomer(){
    this.customer.custCountry = this.selectedCountry;
    this.customerService.updateCustomer(this.authService.decodedToken.nameid, this.customer).subscribe(next =>{
      this.alertify.success("You have updated your information successfully!");
      this.editForm.reset(this.customer);
    },
    error =>{
      this.alertify.error("Oh no! Aliens are preventing your user profile from being updated.");
    });

  }

  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

}
