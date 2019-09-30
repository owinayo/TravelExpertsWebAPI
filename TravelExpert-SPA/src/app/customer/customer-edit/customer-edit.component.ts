import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer } from 'src/app/_models/Customer';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  @ViewChild('editForm', {static:true}) editForm: NgForm;
  customer: Customer;
  constructor(private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data=>{
      this.customer = data['Customer'];
    });
    this.loadScript("../assets/scripts/customer-edit.component.js");
  }

  updateCustomer(){
    console.log(this.customer);
    this.alertify.success("You have updated your information successfully!");
    this.editForm.reset(this.customer);
    

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
