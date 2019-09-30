import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Customer } from 'src/app/_models/Customer';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CustomerService } from 'src/app/_services/customer.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  editForm: FormGroup;
  customer: Customer;
  selectedCountry;
  selectedProvince;
  countries = ["Canada", "USA"];
  provinces = [
    {'country': 'Canada', 'value': "AB"},
                      {'country': 'Canada', 'value': "BC"},
                        {'country': 'Canada', 'value': "MB"},
                    {'country': 'Canada', 'value': "NB"},
                   {'country': 'Canada', 'value': "NL"},
                       {'country': 'Canada', 'value': "NS"},
                    {'country': 'Canada', 'value': "NT"},
                       {'country': 'Canada', 'value': "NU"},
                 {'country': 'Canada', 'value': "ON"},
 {'country': 'Canada', 'value': "PE"},
 {'country': 'Canada', 'value': "QC"},
 {'country': 'Canada', 'value': "SK"},
 {'country': 'Canada', 'value': "YT"},
 {
  "country": "USA",
  "value": "AL"
},
{
  "country": "USA",
  "value": "AK"
},
{
  "country": "USA",
  "value": "AZ"
},
{
  "country": "USA",
  "value": "AR"
},
{
  "country": "USA",
  "value": "CA"
},
{
  "country": "USA",
  "value": "CO"
},
{
  "country": "USA",
  "value": "CT"
},
{
  "country": "USA",
  "value": "DE"
},
{
  "country": "USA",
  "value": "DC"
},
{
  "country": "USA",
  "value": "FL"
},
{
  "country": "USA",
  "value": "GA"
},
{
  "country": "USA",
  "value": "HI"
},
{
  "country": "USA",
  "value": "ID"
},
{
  "country": "USA",
  "value": "IL"
},
{
  "country": "USA",
  "value": "IN"
},
{
  "country": "USA",
  "value": "IA"
},
{
  "country": "USA",
  "value": "KS"
},
{
  "country": "USA",
  "value": "KY"
},
{
  "country": "USA",
  "value": "LA"
},
{
  "country": "USA",
  "value": "ME"
},
{
  "country": "USA",
  "value": "MD"
},
{
  "country": "USA",
  "value": "MA"
},
{
  "country": "USA",
  "value": "MI"
},
{
  "country": "USA",
  "value": "MN"
},
{
  "country": "USA",
  "value": "MS"
},
{
  "country": "USA",
  "value": "MO"
},
{
  "country": "USA",
  "value": "MT"
},
{
  "country": "USA",
  "value": "NE"
},
{
  "country": "USA",
  "value": "NV"
},
{
  "country": "USA",
  "value": "NH"
},
{
  "country": "USA",
  "value": "NJ"
},
{
  "country": "USA",
  "value": "NM"
},
{
  "country": "USA",
  "value": "NY"
},
{
  "country": "USA",
  "value": "NC"
},
{
  "country": "USA",
  "value": "ND"
},
{
  "country": "USA",
  "value": "OH"
},
{
  "country": "USA",
  "value": "OK"
},
{
  "country": "USA",
  "value": "OR"
},
{
  "country": "USA",
  "value": "PA"
},
{
  "country": "USA",
  "value": "RI"
},
{
  "country": "USA",
  "value": "SC"
},
{
  "country": "USA",
  "value": "SD"
},
{
  "country": "USA",
  "value": "TN"
},
{
  "country": "USA",
  "value": "TX"
},
{
  "country": "USA",
  "value": "UT"
},
{
  "country": "USA",
  "value": "VT"
},
{
  "country": "USA",
  "value": "VA"
},
{
  "country": "USA",
  "value": "WA"
},
{
  "country": "USA",
  "value": "WV"
},
{
  "country": "USA",
  "value": "WI"
},
{
  "country": "USA",
  "value": "WY"
}
  ]
  @HostListener('window:beforeunload',['$event'])
  unloadNotification($event: any){
    if(this.editForm.dirty){
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
    private authService: AuthService, private customerService: CustomerService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createEditForm();
    this.route.data.subscribe(data=>{
      this.customer = data['Customer'];
      this.selectedCountry = this.customer.custCountry;
      this.selectedProvince = this.customer.custProv;
    });
    this.loadScript("../assets/scripts/customer-edit.component.js");
  }

  createEditForm(){
    this.editForm = this.formBuilder.group({
      custFirstName: ['', [Validators.required, Validators.minLength(1)]],
      custLastName: ['', [Validators.required, Validators.minLength(1)]],
      custAddress:['', [Validators.required,Validators.minLength(1),Validators.maxLength(200)]],
      custCity:['', [Validators.required,Validators.minLength(1),Validators.maxLength(200)]],
      custProv:['', [Validators.required,Validators.minLength(2),Validators.maxLength(2)]],
      custPostal:['', [Validators.required,Validators.minLength(5),Validators.maxLength(7)]],
      custCountry:['', [Validators.required,Validators.minLength(1),Validators.maxLength(50)]],
      custHomePhone:['', [Validators.required,Validators.minLength(10),Validators.maxLength(15)]],
      custBusPhone:['', [Validators.minLength(10),Validators.maxLength(15)]],
      custEmail:['', [Validators.minLength(5),Validators.maxLength(200),Validators.email]]

    });
  }

  updateCustomer(){
    if(this.showValidation()){
      this.customer.custCountry = this.selectedCountry;
      this.customer.custProv = this.selectedProvince;
      this.customerService.updateCustomer(this.authService.decodedToken.nameid, this.customer).subscribe(next =>{
        this.alertify.success("You have updated your information successfully!");
        this.editForm.reset(this.customer);
      },
      error =>{
        this.alertify.error("Oh no! Aliens are preventing your user profile from being updated.");
      });
    }

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

  showValidation(){

    var firstNameValid = this.editForm.get('custFirstName').valid;
    var lastNameValid = this.editForm.get('custLastName').valid;
    var addressValid = this.editForm.get('custAddress').valid;
    var cityValid = this.editForm.get('custCity').valid;
    var countryValid = this.editForm.get('custCountry').valid;
    var provinceValid = this.editForm.get('custProv').valid;
    var postalValid = this.editForm.get('custPostal').valid;
    var emailValid = this.editForm.get('custEmail').valid;
    var homePhoneValid = this.editForm.get('custHomePhone').valid;
    var busPhoneValid = this.editForm.get('custBusPhone').valid;


    if(this.editForm.invalid){
      if(!firstNameValid){
        this.alertify.error('Your first name is required.');
      }
      if(!lastNameValid){
        this.alertify.error('Your last name is required.');
      }
      if(!addressValid){
        this.alertify.error('Your address is required.');
      }
      if(!cityValid){
        this.alertify.error('Your city is required.');

      }
      if(!countryValid){
        this.alertify.error('Please choose a supported country.');
      }
      if(!provinceValid){
        this.alertify.error("Province/State must be a 2 letter code");
      }
      if(!postalValid){
        this.alertify.error("Your postal/zip code is required or in an incorrect format");
      }
      if(!emailValid){
        this.alertify.error("Your email is invalid.");
      }
      if(!homePhoneValid){
        this.alertify.error("Your home phone is invalid");
      }
      if(!busPhoneValid){
        this.alertify.error("Your business phone is invalid");
      }

      return false;
    }

    return true;

  }

  filterProvinces(){
    return this.provinces.filter(p => p.country == this.selectedCountry);
  }

  chooseCountry(){
    this.editForm.controls['custProv'].setValue('');
    this.customer.custProv='';
  }



}
