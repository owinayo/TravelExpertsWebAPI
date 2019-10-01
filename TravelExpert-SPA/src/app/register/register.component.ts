import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Customer } from '../_models/Customer';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { pairwise } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  customer: Customer;
  registerForm: FormGroup;
  termsButtonClicked: boolean;

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
}];

  constructor(private authService: AuthService, private httpClient: HttpClient, private router: Router,
     private alertify: AlertifyService, private fb: FormBuilder) {

      }

  ngOnInit() {
    this.customer = new Customer();
    this.createRegisterForm();
    this.selectedCountry = "Canada";
    this.termsButtonClicked = false;

    this.setConditionalValidators();

  }

  createRegisterForm(){
    this.registerForm = this.fb.group({
      custFirstName: ['', [Validators.required, Validators.minLength(1)]],
      custLastName: ['', [Validators.required, Validators.minLength(1)]],
      custAddress:['', [Validators.required,Validators.minLength(1),Validators.maxLength(200)]],
      custCity:['', [Validators.required,Validators.minLength(1),Validators.maxLength(200)]],
      custProv:['', [Validators.required,Validators.minLength(2),Validators.maxLength(2)]],
      custPostal:['', [Validators.required,Validators.minLength(5),Validators.maxLength(7)]],
      custCountry:['', [Validators.required,Validators.minLength(1),Validators.maxLength(50)]],
      custHomePhone:['', [Validators.required,Validators.minLength(10),Validators.maxLength(15)]],
      custBusPhone:['', null],
      custEmail:['', null],
      termsAndConditions: ['', Validators.requiredTrue],
      username:['', [Validators.required,Validators.minLength(4),Validators.maxLength(200)]],
      password: ['', [Validators.required,Validators.minLength(4),Validators.maxLength(200)]],
      confirmPassword: ['', Validators.required]

    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(match: FormGroup){
    return match.get('password').value == match.get('confirmPassword').value ? null: {'mismatch': true};
  }

  showTerms(){
    this.termsButtonClicked = !this.termsButtonClicked;
  }

  register(){
    if(this.registerForm.valid){
      this.customer = Object.assign({}, this.registerForm.value);
      if(this.customer.custBusPhone==''){this.customer.custBusPhone=null;}
      if(this.customer.custEmail==''){this.customer.custEmail=null;}
      this.authService.register(this.customer).subscribe(()=>{
        this.alertify.success('Registration successful');
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.authService.login(this.customer).subscribe(() =>{
          this.router.navigate(['/bookedPackages']);
        })
      })
    }
  }

  cancel(){
    this.cancelRegister.emit(false);
    console.log("cancel");
  }

  showValidation(){

    var firstNameValid = this.registerForm.get('custFirstName').valid;
    var lastNameValid = this.registerForm.get('custLastName').valid;
    var addressValid = this.registerForm.get('custAddress').valid;
    var cityValid = this.registerForm.get('custCity').valid;
    var countryValid = this.registerForm.get('custCountry').valid;
    var provinceValid = this.registerForm.get('custProv').valid;
    var postalValid = this.registerForm.get('custPostal').valid;
    var emailValid = this.registerForm.get('custEmail').valid || this.registerForm.get('custEmail').value == '';
    var homePhoneValid = this.registerForm.get('custHomePhone').valid;
    var busPhoneValid = this.registerForm.get('custBusPhone').valid || this.registerForm.get('custBusPhone').value == '';
    var usernameValid = this.registerForm.get('username').valid;
    var passwordValid = this.registerForm.get('password').valid;
    var passwordMatch = !this.registerForm.hasError('mismatch');
    var termsAndConditionsAccepted = this.registerForm.get('termsAndConditions').valid;


    if(this.registerForm.invalid){
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
      if(!usernameValid){
        this.alertify.error('Your username is invalid. Please enter a username between 4 and 200 characters.\n');
      }
      if(!passwordValid){
        this.alertify.error('Your password is invalid. Please enter a password between 4 and 200 characters.\n');
      }
      if(!passwordMatch){
        this.alertify.error('Your passwords do not match.');
      }
      if(!termsAndConditionsAccepted){
        this.alertify.error('You must accept the terms and conditions.');
      }
      return false;
    }

    return true;

  }

  filterProvinces(){
    return this.provinces.filter(p => p.country == this.selectedCountry);
  }

  chooseCountry(){
    this.registerForm.controls['custProv'].setValue('');
    this.customer.custProv='';
  }

  setConditionalValidators() {
    const emailControl = this.registerForm.get('custEmail');
    const busPhoneControl = this.registerForm.get('custBusPhone');

    this.registerForm.get('custEmail').valueChanges
    .pipe(pairwise())
    .subscribe(([prev, next]: [any, any]) => {
        if(prev!=next){
          if (next != '' && next != null) {
            emailControl.setValidators([Validators.minLength(5),Validators.maxLength(200),Validators.email]);
          }
          else{
            console.log('email clear');
            emailControl.clearValidators();
            emailControl.updateValueAndValidity({onlySelf: true, emitEvent: false});
          }
        }
      });

    this.registerForm.get('custBusPhone').valueChanges
    .pipe(pairwise())
    .subscribe(([prev, next]: [any, any]) => {
      if(prev!=next){
        if (next != '' && next != null) {
          busPhoneControl.setValidators([Validators.minLength(10),Validators.maxLength(15)]);
        }
        else{
          console.log('phone clear');
          busPhoneControl.clearValidators();
          busPhoneControl.updateValueAndValidity({onlySelf: true, emitEvent: false});
        }
    }
    });

    emailControl.clearValidators();
    emailControl.updateValueAndValidity();
    busPhoneControl.clearValidators();
    busPhoneControl.updateValueAndValidity();
  }


}
